/* ============================================
   ABOGADA GUERRA — Tracking & WhatsApp Module
   Centraliza: GA4, Meta Pixel, TikTok Pixel,
   Microsoft Clarity, y construcción de URLs
   WhatsApp con UTMs dinámicos.
============================================ */

(function() {
  'use strict';

  // ---- CONFIG: reemplazar con IDs reales en producción ----
  const CONFIG = {
    GA4_ID: 'G-XXXXXXXXXX',                  // Google Analytics 4
    META_PIXEL_ID: '1637086874251811',       // Meta Pixel — Abogada Guerra
    TIKTOK_PIXEL_ID: 'XXXXXXXXXXXXXXXXX',    // TikTok Pixel
    CLARITY_ID: 'XXXXXXXXXX',                // Microsoft Clarity
    BOTCAKE_ID: 'XXXXXXXXXX',                // Pancake / Botcake widget
    WHATSAPP_PHONE: '573212467679',          // WhatsApp Business Stephanie (Colombia, E.164 sin +)
    BUSINESS_HOURS: { start: 9, end: 19 }    // Horario humano (Bucaramanga · UTC-5)
  };

  // ---- 1. GOOGLE ANALYTICS 4 ----
  function initGA4() {
    if (CONFIG.GA4_ID === 'G-XXXXXXXXXX') return; // Solo si está configurado
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA4_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', CONFIG.GA4_ID, {
      page_path: window.location.pathname,
      send_page_view: true
    });
  }

  // ---- 2. META PIXEL ----
  function initMetaPixel() {
    if (CONFIG.META_PIXEL_ID === '000000000000000') return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CONFIG.META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // ---- 3. TIKTOK PIXEL ----
  function initTikTokPixel() {
    if (CONFIG.TIKTOK_PIXEL_ID === 'XXXXXXXXXXXXXXXXX') return;
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load(CONFIG.TIKTOK_PIXEL_ID);
      ttq.page();
    }(window, document, 'ttq');
  }

  // ---- 4. MICROSOFT CLARITY ----
  function initClarity() {
    if (CONFIG.CLARITY_ID === 'XXXXXXXXXX') return;
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", CONFIG.CLARITY_ID);
  }

  // ---- 5. UNIFIED EVENT TRACKING ----
  function trackEvent(eventName, params) {
    params = params || {};
    // Console (dev)
    console.log('[Track]', eventName, params);
    // GA4
    if (window.gtag) window.gtag('event', eventName, params);
    // Meta
    if (window.fbq) {
      const fbEvents = {
        click_whatsapp: 'Contact',
        download_lead_magnet: 'Lead',
        submit_contact_form: 'Lead',
        submit_lm_form: 'CompleteRegistration'
      };
      if (fbEvents[eventName]) window.fbq('track', fbEvents[eventName], params);
    }
    // TikTok
    if (window.ttq) {
      const ttEvents = {
        click_whatsapp: 'ClickButton',
        download_lead_magnet: 'SubmitForm',
        submit_contact_form: 'Contact'
      };
      if (ttEvents[eventName]) window.ttq.track(ttEvents[eventName], params);
    }
  }

  // ---- 6. WHATSAPP URL BUILDER ----
  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path.replace('.html', '') || 'home';
  }

  function buildWhatsAppURL(opts) {
    opts = opts || {};
    const phone = CONFIG.WHATSAPP_PHONE;
    const page = getCurrentPage();
    const location = opts.location || 'unknown';
    const message = opts.message || 'Hola Stephanie, llegué a tu sitio y me gustaría orientación.';

    // UTM params
    const utm = new URLSearchParams({
      utm_source: 'web',
      utm_medium: location,
      utm_campaign: page
    }).toString();

    // wa.me URL con texto que incluye UTM al final como tracking interno
    const fullText = message + '\n\n[' + utm + ']';
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(fullText);
  }

  // ---- 7. ENRICH WhatsApp LINKS ----
  // Convierte todos los elementos con data-track="whatsapp" en links directos a wa.me
  function enrichWhatsAppLinks() {
    const messages = {
      // Mensajes contextuales por location
      'hero': 'Hola Stephanie, llegué a tu sitio. Quisiera orientación sobre mi caso.',
      'header': 'Hola Stephanie, quiero hablar contigo. Por favor orientame.',
      'floating': 'Hola Stephanie, te escribo desde tu sitio.',
      'cta-final': 'Hola Stephanie, llegué hasta el final de tu sitio. Necesito hablar contigo.',
      'cta-final-urgent': 'URGENTE — Detuvieron a un familiar. Necesito orientación AHORA.',
      'urgent-hero': 'URGENTE — Detuvieron a un familiar. Necesito ayuda inmediata.',
      'urgent-section': 'URGENTE — Tengo una detención reciente. Por favor responde.',
      'contact-card': 'Hola Stephanie, quiero orientación sobre mi caso.',
      'sobremi': 'Hola Stephanie, leí tu historia y quiero hablar contigo.',
      'lm-form': 'Hola Stephanie, acabo de pedir la Guía de Emergencia 12h.',
      'unknown': 'Hola Stephanie, quiero orientación.'
    };

    document.querySelectorAll('[data-track="whatsapp"]').forEach(function(el) {
      // Solo enriquecer si NO es un form (los forms abren WA al submit)
      if (el.tagName === 'BUTTON') return;

      const location = el.dataset.location || 'unknown';
      const customMsg = el.dataset.whatsappMsg;
      const message = customMsg || messages[location] || messages.unknown;
      const url = buildWhatsAppURL({ location: location, message: message });

      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');

      // Click tracking
      el.addEventListener('click', function() {
        trackEvent('click_whatsapp', {
          location: location,
          page: getCurrentPage(),
          timestamp: new Date().toISOString()
        });
      });
    });
  }

  // ---- 8. DYNAMIC WHATSAPP STATUS ----
  function updateWhatsAppStatus() {
    const floatingBtn = document.querySelector('.whatsapp-floating');
    if (!floatingBtn) return;

    const hour = new Date().getHours();
    const inHours = hour >= CONFIG.BUSINESS_HOURS.start && hour < CONFIG.BUSINESS_HOURS.end;
    const textEl = floatingBtn.querySelector('.whatsapp-floating__text');
    const indicator = floatingBtn.querySelector('.whatsapp-floating__status');

    if (textEl) {
      textEl.textContent = inHours ? 'En línea · Responde ahora' : 'Asistente 24/7 · Urgencias';
    }
    if (indicator) {
      indicator.classList.toggle('whatsapp-floating__status--online', inHours);
    }
  }

  // ---- 9. INIT ALL ----
  function init() {
    initGA4();
    initMetaPixel();
    initTikTokPixel();
    initClarity();
    enrichWhatsAppLinks();
    updateWhatsAppStatus();

    // Scroll tracking
    let scrolled75 = false;
    window.addEventListener('scroll', function() {
      if (scrolled75) return;
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.75) {
        scrolled75 = true;
        trackEvent('scroll_75_percent', { page: getCurrentPage() });
      }
    }, { passive: true });

    // Time on page > 180s
    setTimeout(function() {
      trackEvent('time_on_page_180s', { page: getCurrentPage() });
    }, 180000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer API pública
  window.AbogadaGuerra = {
    trackEvent: trackEvent,
    buildWhatsAppURL: buildWhatsAppURL,
    config: CONFIG
  };

})();
