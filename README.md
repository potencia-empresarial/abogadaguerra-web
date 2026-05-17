# abogadaguerra.com

**Sitio web de Stephanie Guerra · Defensa Penal**
**Desarrollado y mantenido por:** Potencia Empresarial

[![Netlify Status](https://api.netlify.com/api/v1/badges/PLACEHOLDER/deploy-status)](https://app.netlify.com/sites/abogadaguerra/deploys)

---

## 🎯 Resumen ejecutivo

Sitio web estático de defensa penal para abogada en Bucaramanga, Colombia. Stack ultra-ligero (HTML5 + CSS + JS vanilla, 484 KB total) con CRO avanzado (multi-step forms, exit-intent, calculadora honorarios, blog SEO).

- **Dominio:** [abogadaguerra.com](https://abogadaguerra.com)
- **Mercado:** Colombia · Bucaramanga (Santander)
- **Idioma:** Español (`es-CO`)
- **Marco legal:** Ley 906/2004, Ley 1581/2012, Ley 1123/2007
- **Cliente:** Stephanie Guerra (registrada como dueña del dominio)

---

## 📂 Estructura del repositorio

```
abogadaguerra-web/
├── index.html                          ← Home
├── sobre-mi.html                       ← Bio profesional
├── detencion-de-un-familiar.html       ← P1 URGENTE
├── citatorio-investigacion.html        ← P2
├── defensa-empresarial.html            ← P3 Premium
├── victima-delito.html                 ← P4
├── honorarios.html                     ← Calculadora COP
├── preguntas-frecuentes.html           ← FAQ con schema
├── testimonios.html                    ← 12 testimonios anonimizados
├── contacto.html                       ← Multi-step form + Calendly
├── guia-emergencia-12-horas.html       ← Lead Magnet P1
├── checklist-ley-906.html              ← Lead Magnet P2
├── whitepaper-defensa-empresarial.html ← Lead Magnet P3
├── aviso-de-privacidad.html            ← Legal (Ley 1581)
├── terminos.html                       ← Legal
├── cookies.html                        ← Legal
├── blog/
│   ├── index.html
│   └── 10 posts SEO (Ley 906, Habeas Corpus, etc.)
├── css/
│   └── styles.css                      ← Design system completo
├── js/
│   ├── script.js                       ← Interacciones base
│   ├── tracking.js                     ← GA4 + Meta + TikTok + Clarity + WhatsApp UTM
│   ├── components.js                   ← Multi-step + exit-intent + newsletter
│   └── sprint3.js                      ← Calculadora + TOC + Botcake + A/B
├── assets/
│   ├── img/                            ← Fotos profesionales (placeholder)
│   ├── icons/                          ← SVG icons inline
│   └── fonts/                          ← (Google Fonts via CDN actualmente)
├── sitemap.xml                         ← 27 URLs
├── robots.txt
├── netlify.toml                        ← Config Netlify (headers, redirects, contexts)
├── _redirects                          ← Fallback (legacy)
├── _headers                            ← Fallback (legacy)
└── README.md                           ← Este archivo
```

---

## 🚀 Workflow de desarrollo

### Branches
- `main` → producción (`abogadaguerra.com`)
- `staging` → preview (`staging--abogadaguerra.netlify.app`)
- `feature/*` → branches de trabajo (PRs hacia `staging`)

### Flujo estándar
```bash
# 1. Crear branch de trabajo desde staging
git checkout staging
git pull origin staging
git checkout -b feature/nombre-descriptivo

# 2. Hacer cambios
# ... editar archivos ...

# 3. Commit con convención (ver CONTRIBUTING.md)
git add .
git commit -m "feat(home): actualizar microbar con counter dinámico"

# 4. Push y abrir PR
git push origin feature/nombre-descriptivo
# Abrir PR en GitHub: feature/* → staging

# 5. Tras review, merge a staging
# Netlify genera preview automático
# Validar en https://staging--abogadaguerra.netlify.app

# 6. Si OK, PR de staging → main
# Push a main = deploy automático a abogadaguerra.com
```

### Probar localmente
```bash
# Opción 1: Python
cd sitio_web
python3 -m http.server 8000
# Abrir http://localhost:8000

# Opción 2: Node
npx serve .

# Opción 3: VS Code Live Server
```

---

## 🔧 Configuración técnica

### Variables placeholder en `js/tracking.js` (cambiar cuando lleguen IDs)

```js
const CONFIG = {
  GA4_ID:          'G-XXXXXXXXXX',         // ← Google Analytics 4
  META_PIXEL_ID:   '000000000000000',      // ← Meta Pixel
  TIKTOK_PIXEL_ID: 'XXXXXXXXXXXXXXXXX',    // ← TikTok Pixel
  CLARITY_ID:      'XXXXXXXXXX',           // ← Microsoft Clarity
  BOTCAKE_ID:      'XXXXXXXXXX',           // ← Pancake Botcake widget
  WHATSAPP_PHONE:  '573116074995',         // ✅ Configurado (Stephanie Colombia)
  BUSINESS_HOURS:  { start: 9, end: 19 }
};
```

Cuando cambies estos IDs, hacer un solo commit y push → deploy automático.

### Netlify

- **Site name:** `abogadaguerra` (en cuenta Potencia Empresarial)
- **Build command:** ninguno (sitio estático)
- **Publish directory:** `.` (root del repo)
- **Branch deploy producción:** `main`
- **Branch deploy preview:** `staging`
- **Custom domain:** `abogadaguerra.com`
- **SSL:** Let's Encrypt (auto-renewed)

---

## 📊 Performance & SEO

- **Tamaño total:** 484 KB (incluido CSS, JS, sitemap)
- **Core Web Vitals objetivo:** LCP <2.5s, CLS <0.1, INP <200ms
- **Schema markup:** LegalService, FAQPage, Article, BreadcrumbList
- **Open Graph:** completo en 27/27 páginas
- **Sitemap:** 27 URLs con prioridades ponderadas
- **Canonical:** todas las páginas

---

## 🧪 A/B Testing

Sistema de A/B testing cookie-based en `js/sprint3.js`. Para crear un test:

```html
<!-- Variante A (control) -->
<h1 data-ab-test="hero-headline" data-ab-variant="A">
  Defensa penal cuando más lo necesitas.
</h1>

<!-- Variante B (challenger) -->
<h1 data-ab-test="hero-headline" data-ab-variant="B">
  Cuando capturan a tu familia, las primeras 12 horas deciden todo.
</h1>
```

El framework asigna 50/50, mantiene sticky en localStorage, y reporta evento `ab_exposure` a GA4.

---

## 🛡️ Cumplimiento legal Colombia

- **Aviso de Privacidad:** Ley 1581 de 2012 + Decreto 1377 de 2013
- **Términos:** Ley 906/2004, Ley 1123/2007 (Código Disciplinario Abogado)
- **Cookies:** Política conforme régimen colombiano
- **Autoridad de control:** SIC (Superintendencia de Industria y Comercio)
- **Jurisdicción:** Bucaramanga, Santander

---

## 👥 Equipo y permisos

| Rol | Permisos GitHub | Permisos Netlify |
|---|---|---|
| Gerencia Potencia | Admin org + repo | Owner |
| Dev senior | Write (puede merge a main) | Deploy |
| Dev junior | Write (solo a staging via PR) | Read |
| Cliente (Stephanie) | Sin acceso por defecto | Sin acceso por defecto |

---

## 📞 Soporte y contacto

**Cliente:**
- Stephanie Guerra · WhatsApp: +57 311 607 4995

**Agencia (mantenimiento):**
- Potencia Empresarial · gerencia@potenciaempresarial.site

---

## 📜 Licencia y propiedad intelectual

Código y diseño desarrollados por **Potencia Empresarial** para **Stephanie Guerra (Abogada Guerra)** bajo contrato de prestación de servicios.

- Texto, copy y contenido legal: propiedad intelectual de la cliente
- Código, diseño visual y arquitectura: propiedad intelectual de Potencia Empresarial (uso licenciado al cliente)
- En caso de terminación de servicio: ver cláusula de handoff en el MSA

© 2026 Stephanie Guerra · Sitio desarrollado por Potencia Empresarial
