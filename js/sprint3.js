/* ============================================
   ABOGADA GUERRA — Sprint 3 Components
   Calculadora honorarios, Blog (TOC + progress),
   Botcake widget, Google Maps lazy, A/B testing
============================================ */

(function() {
  'use strict';

  // ============================================
  // 1. CALCULADORA HONORARIOS
  // ============================================
  function initCalculator() {
    const calc = document.querySelector('[data-calc-honorarios]');
    if (!calc) return;

    // Estructura tarifaria Colombia (rangos en COP)
    const HONORARIOS = {
      'audiencia-preliminar':    { min: 3000000,  max: 8000000,  label: 'Audiencia preliminar + imputación' },
      'investigacion':           { min: 5000000,  max: 12000000, label: 'Investigación complementaria' },
      'juicio-oral':             { min: 15000000, max: 50000000, label: 'Juicio oral' },
      'tutela-habeas':           { min: 2000000,  max: 6000000,  label: 'Tutela penal / Habeas Corpus' },
      'representacion-victima':  { min: 2000000,  max: 5000000,  label: 'Representación de víctima' },
      'iguala-empresarial':      { min: 3000000,  max: 8000000,  label: 'Iguala mensual empresarial' }
    };

    // Modificadores por complejidad
    const COMPLEJIDAD = {
      'baja':  { mult: 1.0,  label: 'Caso de complejidad baja' },
      'media': { mult: 1.25, label: 'Caso de complejidad media' },
      'alta':  { mult: 1.5,  label: 'Caso de complejidad alta' }
    };

    // Modificadores por urgencia
    const URGENCIA = {
      'estandar': { add: 0,        label: 'Sin urgencia especial' },
      'urgente':  { add: 500000,   label: 'Urgencia activa (<36h)' },
      'critica':  { add: 1000000,  label: 'Crítica (audiencia mañana)' }
    };

    function getSelection(name) {
      const el = calc.querySelector('input[name="' + name + '"]:checked');
      return el ? el.value : null;
    }

    function fmtCOP(n) {
      // Si es menos de 1M, muestra con separador de miles
      if (n < 1000000) return '$' + Math.round(n).toLocaleString('es-CO') + ' COP';
      // Si es 1M o más, muestra como "$X.XM COP"
      const millions = (n / 1000000).toFixed(1).replace(/\.0$/, '');
      return '$' + millions + 'M COP';
    }
    // Alias para compatibilidad
    const fmtMXN = fmtCOP;

    function update() {
      const etapa = getSelection('etapa');
      const complejidad = getSelection('complejidad') || 'media';
      const urgencia = getSelection('urgencia') || 'estandar';
      const resultEl = calc.querySelector('.calc__result');
      if (!resultEl) return;

      if (!etapa) {
        resultEl.style.display = 'none';
        return;
      }

      const h = HONORARIOS[etapa];
      const c = COMPLEJIDAD[complejidad];
      const u = URGENCIA[urgencia];
      const minFinal = h.min * c.mult + u.add;
      const maxFinal = h.max * c.mult + u.add;

      resultEl.style.display = 'block';
      const labelEl = resultEl.querySelector('.calc__result-label');
      const amountEl = resultEl.querySelector('.calc__result-amount');
      const noteEl = resultEl.querySelector('.calc__result-note');
      if (labelEl) labelEl.textContent = h.label;
      if (amountEl) amountEl.textContent = fmtCOP(minFinal) + ' — ' + fmtCOP(maxFinal);
      if (noteEl) {
        noteEl.innerHTML = c.label + ' · ' + u.label +
          '<br><strong>Honorarios referenciales.</strong> El precio exacto se acuerda en consulta y se documenta por contrato. Planes de pago disponibles.';
      }

      // Highlight selected options
      calc.querySelectorAll('.calc__option').forEach(function(opt) {
        const input = opt.querySelector('input');
        opt.classList.toggle('calc__option--selected', input && input.checked);
      });

      // Track event
      window.AbogadaGuerra && window.AbogadaGuerra.trackEvent('calculator_used', {
        etapa: etapa, complejidad: complejidad, urgencia: urgencia,
        min: minFinal, max: maxFinal
      });
    }

    calc.addEventListener('change', update);
    update();
  }

  // ============================================
  // 2. READING PROGRESS BAR (BLOG)
  // ============================================
  function initReadProgress() {
    const bar = document.querySelector('.read-progress__bar');
    const article = document.querySelector('[data-article]');
    if (!bar || !article) return;

    function update() {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ============================================
  // 3. TABLE OF CONTENTS (BLOG)
  // ============================================
  function initTOC() {
    const tocContainer = document.querySelector('[data-toc]');
    const article = document.querySelector('[data-article]');
    if (!tocContainer || !article) return;

    const headings = article.querySelectorAll('h2');
    if (headings.length < 2) {
      tocContainer.style.display = 'none';
      return;
    }

    const list = document.createElement('ul');
    list.className = 'toc__list';
    headings.forEach(function(h, idx) {
      const id = h.id || 'sec-' + idx;
      h.id = id;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = h.textContent;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    tocContainer.appendChild(list);

    // Active link on scroll
    const links = list.querySelectorAll('a');
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(function(l) {
            l.classList.toggle('toc__active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    headings.forEach(function(h) { observer.observe(h); });
  }

  // ============================================
  // 4. BOTCAKE WIDGET (lazy load)
  // ============================================
  function initBotcake() {
    const BOTCAKE_ID = window.AbogadaGuerra && window.AbogadaGuerra.config.BOTCAKE_ID;
    if (!BOTCAKE_ID || BOTCAKE_ID === 'XXXXXXXXXX') return;

    // Lazy load del widget tras primera interacción o 8s
    let loaded = false;
    function load() {
      if (loaded) return;
      loaded = true;
      const s = document.createElement('script');
      s.async = true;
      // URL placeholder de Botcake — sustituir por la real al configurar
      s.src = 'https://widget.pancake.io/v1/embed.js?id=' + BOTCAKE_ID;
      document.body.appendChild(s);
    }
    ['click', 'scroll', 'mousemove', 'keydown'].forEach(function(ev) {
      window.addEventListener(ev, load, { once: true, passive: true });
    });
    setTimeout(load, 8000);
  }

  // ============================================
  // 5. GOOGLE MAPS — Lazy load on intersection
  // ============================================
  function initMapsLazy() {
    document.querySelectorAll('[data-maps-lazy]').forEach(function(el) {
      const src = el.dataset.mapsLazy;
      if (!src) return;
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.loading = 'lazy';
            iframe.setAttribute('allowfullscreen', '');
            iframe.referrerPolicy = 'no-referrer-when-downgrade';
            el.innerHTML = '';
            el.appendChild(iframe);
            observer.disconnect();
          }
        });
      }, { rootMargin: '200px' });
      observer.observe(el);
    });
  }

  // ============================================
  // 6. A/B TESTING FRAMEWORK (cookie-based)
  // ============================================
  // Uso: <element data-ab-test="hero-headline" data-ab-variant="A">...</element>
  //      <element data-ab-test="hero-headline" data-ab-variant="B">...</element>
  // El framework asigna al usuario una variante 50/50 (sticky en localStorage)
  // y oculta la otra. Reporta evento al tracking.
  function initABTests() {
    const tests = {};
    document.querySelectorAll('[data-ab-test]').forEach(function(el) {
      const name = el.dataset.abTest;
      const variant = el.dataset.abVariant;
      if (!tests[name]) tests[name] = [];
      tests[name].push({ el: el, variant: variant });
    });

    Object.keys(tests).forEach(function(name) {
      const variants = tests[name];
      if (variants.length < 2) return;
      const uniqueVariants = [...new Set(variants.map(function(v) { return v.variant; }))];
      const storageKey = 'ab_' + name;
      let chosen = localStorage.getItem(storageKey);
      if (!chosen || !uniqueVariants.includes(chosen)) {
        chosen = uniqueVariants[Math.floor(Math.random() * uniqueVariants.length)];
        localStorage.setItem(storageKey, chosen);
      }
      variants.forEach(function(v) {
        v.el.style.display = (v.variant === chosen) ? '' : 'none';
      });

      // Reportar a tracking
      window.AbogadaGuerra && window.AbogadaGuerra.trackEvent('ab_exposure', {
        test: name, variant: chosen
      });
    });
  }

  // ============================================
  // 7. VIDEO HERO — Lazy embed YouTube/Vimeo
  // ============================================
  function initVideoHero() {
    document.querySelectorAll('[data-video-embed]').forEach(function(el) {
      el.addEventListener('click', function() {
        const url = el.dataset.videoEmbed;
        if (!url) return;
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        el.innerHTML = '';
        el.appendChild(iframe);
        window.AbogadaGuerra && window.AbogadaGuerra.trackEvent('video_play', {
          location: el.dataset.location || 'unknown'
        });
      });
    });
  }

  // ============================================
  // INIT
  // ============================================
  function init() {
    initCalculator();
    initReadProgress();
    initTOC();
    initBotcake();
    initMapsLazy();
    initABTests();
    initVideoHero();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
