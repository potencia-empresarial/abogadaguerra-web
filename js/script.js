/* ============================================
   ABOGADA GUERRA — Site Interactions
   v1.0
============================================ */

(function() {
  'use strict';

  // ---- 1. Mobile nav toggle ----
  const navToggle = document.querySelector('.nav-mobile-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const navClose = document.querySelector('.nav-mobile-close');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (navClose && navMobile) {
    navClose.addEventListener('click', () => {
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- 2. Reveal on scroll (Intersection Observer) ----
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ---- 3. WhatsApp click tracking ----
  document.querySelectorAll('[data-track="whatsapp"]').forEach(el => {
    el.addEventListener('click', () => {
      console.log('[Track] WhatsApp click', {
        location: el.dataset.location || 'unknown',
        timestamp: new Date().toISOString()
      });
      // Aquí se integra con Google Analytics / Meta Pixel cuando esté listo
    });
  });

  // ---- 4. Lead Magnet form handler ----
  // NOTA: el formulario con [data-multistep] lo gestiona components.js (motor
  // multi-paso + WhatsApp con número oficial). Este handler legacy queda inerte
  // para evitar doble apertura de WhatsApp / número placeholder.
  const lmForm = document.querySelector('#lm-form:not([data-multistep])');
  if (lmForm) {
    lmForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(lmForm);
      const data = Object.fromEntries(formData.entries());

      // Validación básica
      if (!data.nombre || !data.whatsapp) {
        showFormMessage(lmForm, 'Necesito tu nombre y WhatsApp para enviarte la guía.', 'error');
        return;
      }

      // Validar WhatsApp (10 dígitos mínimo)
      const phoneClean = data.whatsapp.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        showFormMessage(lmForm, 'El número de WhatsApp parece incompleto. Incluye el código de país si es necesario.', 'error');
        return;
      }

      console.log('[Form] Lead magnet submission', data);

      // Placeholder: aquí se conecta con Pancake / CRM
      // Por ahora, simular envío y redirigir a WhatsApp
      showFormMessage(lmForm, '¡Listo! Te escribo por WhatsApp en menos de 1 minuto con la guía.', 'success');

      // En producción: POST a endpoint que dispare bot de Pancake
      setTimeout(() => {
        const waText = encodeURIComponent(
          `Hola, soy ${data.nombre}. Acabo de descargar la Guía de Emergencia 12 horas en abogadaguerra.com y me gustaría recibirla.`
        );
        const waPhone = '573212467679'; // WhatsApp oficial Abogada Guerra
        window.open(`https://wa.me/${waPhone}?text=${waText}`, '_blank');
      }, 1500);
    });
  }

  function showFormMessage(form, message, type) {
    let msgEl = form.querySelector('.form-message');
    if (!msgEl) {
      msgEl = document.createElement('div');
      msgEl.className = 'form-message';
      msgEl.style.marginTop = '1rem';
      msgEl.style.padding = '0.75rem 1rem';
      msgEl.style.borderRadius = '8px';
      msgEl.style.fontSize = '0.875rem';
      form.appendChild(msgEl);
    }
    msgEl.textContent = message;
    if (type === 'success') {
      msgEl.style.background = 'rgba(79, 122, 74, 0.12)';
      msgEl.style.color = '#3D5F39';
    } else {
      msgEl.style.background = 'rgba(192, 57, 43, 0.12)';
      msgEl.style.color = '#A0322A';
    }
  }

  // ---- 5. Smooth scroll para anchors ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: elementPos, behavior: 'smooth' });
      }
    });
  });

  // ---- 6. Active nav link ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .nav-mobile a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // ---- 7. Año dinámico en footer ----
  const yearEls = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);

})();
