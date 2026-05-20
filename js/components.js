/* ============================================
   ABOGADA GUERRA — Component Library Sprint 2
   Multi-step forms, Exit-intent modals,
   Newsletter signup, FAQ search
============================================ */

(function() {
  'use strict';

  // ============================================
  // 1. MULTI-STEP FORM ENGINE
  // ============================================
  function initMultiStepForms() {
    document.querySelectorAll('[data-multistep]').forEach(function(form) {
      const steps = form.querySelectorAll('.ms-form__step');
      const progressBar = form.querySelector('.ms-form__progress-bar');
      const progressText = form.querySelector('.ms-form__progress-text');
      const totalSteps = steps.length;
      let currentStep = 0;

      function showStep(idx) {
        steps.forEach(function(s, i) {
          s.classList.toggle('ms-form__step--active', i === idx);
        });
        if (progressBar) {
          const pct = ((idx + 1) / totalSteps) * 100;
          progressBar.style.width = pct + '%';
        }
        if (progressText) {
          progressText.textContent = 'Paso ' + (idx + 1) + ' de ' + totalSteps;
        }
      }

      function validateStep(idx) {
        const step = steps[idx];
        const required = step.querySelectorAll('[required]');
        let valid = true;
        let firstInvalid = null;
        required.forEach(function(input) {
          input.classList.remove('ms-input--error');
          const hint = input.parentElement.querySelector('.ms-form__error');
          if (hint) hint.remove();
          if (!input.value.trim() || (input.type === 'checkbox' && !input.checked)) {
            valid = false;
            input.classList.add('ms-input--error');
            if (!firstInvalid) firstInvalid = input;
            const err = document.createElement('p');
            err.className = 'ms-form__error';
            err.textContent = 'Este campo es necesario para continuar.';
            input.parentElement.appendChild(err);
          }
          // Phone validation
          if (input.type === 'tel' && input.value.trim()) {
            const digits = input.value.replace(/\D/g, '');
            if (digits.length < 10) {
              valid = false;
              input.classList.add('ms-input--error');
              if (!firstInvalid) firstInvalid = input;
              const err = document.createElement('p');
              err.className = 'ms-form__error';
              err.textContent = 'Necesito un WhatsApp completo (mínimo 10 dígitos).';
              input.parentElement.appendChild(err);
            }
          }
        });
        if (firstInvalid) firstInvalid.focus();
        return valid;
      }

      form.querySelectorAll('[data-next]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          if (validateStep(currentStep) && currentStep < totalSteps - 1) {
            currentStep++;
            showStep(currentStep);
            window.AbogadaGuerra && window.AbogadaGuerra.trackEvent('ms_form_step', {
              form: form.dataset.multistep,
              step: currentStep + 1
            });
          }
        });
      });

      form.querySelectorAll('[data-prev]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
          }
        });
      });

      // Quick-select buttons (e.g., "¿Cuál es tu situación?" buttons)
      form.querySelectorAll('[data-quickselect]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const value = btn.dataset.quickselect;
          const field = btn.dataset.field;
          const hidden = form.querySelector('[name="' + field + '"]');
          if (hidden) hidden.value = value;
          // Mark as selected
          form.querySelectorAll('[data-field="' + field + '"]').forEach(function(b) {
            b.classList.remove('ms-btn-select--active');
          });
          btn.classList.add('ms-btn-select--active');
          // Auto-advance if not last step
          if (currentStep < totalSteps - 1) {
            setTimeout(function() {
              currentStep++;
              showStep(currentStep);
            }, 300);
          }
        });
      });

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateStep(currentStep)) return;
        handleFormSubmit(form);
      });

      // Init
      showStep(0);
    });
  }

  function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const formId = form.dataset.multistep;

    console.log('[Form] Submit:', formId, data);
    window.AbogadaGuerra && window.AbogadaGuerra.trackEvent(
      formId === 'lm-form' ? 'submit_lm_form' :
      formId === 'contact-form' ? 'submit_contact_form' :
      'submit_form',
      { form: formId, ...data }
    );

    // Success view
    const wrapper = form.parentElement;
    const success = wrapper.querySelector('.ms-form__success');
    if (success) {
      form.style.display = 'none';
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Open WhatsApp with context
    setTimeout(function() {
      const phone = (window.AbogadaGuerra && window.AbogadaGuerra.config.WHATSAPP_PHONE) || '573212467670';
      const name = data.nombre || 'Hola';
      let msg = '';
      if (formId === 'lm-form') {
        const urgencia = data.urgencia || '';
        msg = name + ', acabo de descargar la Guía de Emergencia 12 horas. ' +
              (urgencia === 'urgente' ? '⚠️ Mi caso es URGENTE (detención activa <48h). Necesito orientación AHORA.' :
               urgencia === 'proceso' ? 'Tengo un proceso activo y necesito asesoría.' :
               urgencia === 'prevencion' ? 'Es una situación preventiva, quiero estar preparado/a.' :
               'Me estoy informando, gracias por la guía.');
      } else if (formId === 'contact-form') {
        msg = 'Hola, soy ' + name + ' y quiero agendar una consulta.' +
              '\n\nCorreo: ' + (data.email || 'N/D') +
              '\nCiudad: ' + (data.ciudad || 'N/D') +
              '\nTipo de caso: ' + (data.tipo || 'consulta general') +
              '\nDescripcion: ' + (data.mensaje || 'N/D');
      }
      const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank', 'noopener');
    }, 1200);
  }

  // ============================================
  // 2. EXIT-INTENT MODAL
  // ============================================
  function initExitIntent() {
    const modal = document.querySelector('[data-exit-intent]');
    if (!modal) return;
    if (window.innerWidth < 768) return; // No mobile (anti-pattern)

    // Check if shown in this session
    if (sessionStorage.getItem('exitIntentShown')) return;

    let triggered = false;

    function showModal() {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem('exitIntentShown', '1');
      modal.classList.add('exit-modal--open');
      document.body.style.overflow = 'hidden';
      window.AbogadaGuerra && window.AbogadaGuerra.trackEvent('exit_intent_shown', {
        page: window.location.pathname
      });
    }

    function closeModal() {
      modal.classList.remove('exit-modal--open');
      document.body.style.overflow = '';
    }

    // Mouse leaves through top of viewport
    document.addEventListener('mouseout', function(e) {
      if (!e.relatedTarget && e.clientY < 10) showModal();
    });

    // Tab visibility change
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        setTimeout(function() {
          if (document.hidden) showModal();
        }, 1500);
      }
    });

    modal.querySelectorAll('[data-modal-close]').forEach(function(btn) {
      btn.addEventListener('click', closeModal);
    });

    // Close on overlay click
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target.classList.contains('exit-modal__overlay')) {
        closeModal();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('exit-modal--open')) closeModal();
    });
  }

  // ============================================
  // 3. NEWSLETTER SIGNUP
  // ============================================
  function initNewsletter() {
    document.querySelectorAll('[data-newsletter]').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        const successEl = form.querySelector('.newsletter__success');
        const errorEl = form.querySelector('.newsletter__error');

        if (errorEl) errorEl.textContent = '';
        if (successEl) successEl.style.display = 'none';

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          if (errorEl) errorEl.textContent = 'Necesito un email válido.';
          emailInput.focus();
          return;
        }

        console.log('[Newsletter] Subscribe:', email);
        window.AbogadaGuerra && window.AbogadaGuerra.trackEvent('newsletter_signup', { email: email });

        // Placeholder: aquí conectar a MailerLite/ConvertKit
        emailInput.value = '';
        if (successEl) {
          successEl.style.display = 'block';
          successEl.textContent = '✓ ¡Listo! Te suscribiste al boletín mensual.';
        }
      });
    });
  }

  // ============================================
  // 4. FAQ SEARCH (mejora preguntas-frecuentes.html)
  // ============================================
  function initFAQSearch() {
    const search = document.querySelector('[data-faq-search]');
    if (!search) return;

    search.addEventListener('input', function() {
      const query = search.value.trim().toLowerCase();
      document.querySelectorAll('.faq-item').forEach(function(item) {
        const text = item.textContent.toLowerCase();
        item.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

  // ============================================
  // INIT
  // ============================================
  function init() {
    initMultiStepForms();
    initExitIntent();
    initNewsletter();
    initFAQSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
