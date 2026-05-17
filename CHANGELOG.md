# Changelog · abogadaguerra.com

Todos los cambios notables del proyecto se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).
Versionado: [SemVer](https://semver.org/lang/es/).

---

## [1.0.0] — 2026-05-17

### 🚀 Release inicial pública

**Sitio web completo de Abogada Guerra (Stephanie Guerra · Defensa Penal · Bucaramanga, Colombia)**

### Added — Páginas y contenido
- 14 páginas principales (Home, Sobre mí, 4 segmentaciones por persona, Honorarios, FAQ, Testimonios, Contacto, 3 Lead Magnets, 3 legales)
- 1 blog index + 10 posts SEO con Article schema
- FAQ schema con 12 preguntas (Ley 906 Colombia)
- 12 testimonios anonimizados categorizados por tipo de caso
- Lead Magnets: Guía Emergencia 12 horas (P1), Checklist Ley 906 (P2), Whitepaper Defensa Empresarial (P3)

### Added — CRO Sprint 1 (Quick Wins)
- Microbar de prueba social above-the-fold (★★★★★ + counter)
- Hero CTA reordenado (1 primario dominante + link secundario subordinado)
- Tracking centralizado: GA4 + Meta Pixel + TikTok Pixel + Microsoft Clarity (placeholders)
- WhatsApp URLs dinámicos con UTM por origen y mensaje contextual
- Mobile CTA persistente "Hablar" fuera del drawer
- Iconos SVG inline reemplazando emojis en cards principales
- Testimonios con avatar + estrellas + fecha + Google Reviews badge
- sitemap.xml con 27 URLs prioritizadas
- robots.txt configurado
- FAQ schema para rich snippets Google
- `defer` en scripts JS + `preload` en fonts críticas

### Added — CRO Sprint 2 (Funcional)
- Multi-step forms con progress bar (Lead Magnet, Contacto, Whitepaper)
- Exit-intent modal en página P1 y honorarios
- Sección "Por qué NO contratarme" (Home + Sobre mí) — honestidad radical
- Comparativa Mercado vs Stephanie en honorarios
- Newsletter signup pre-footer en 8 páginas
- Página `/testimonios/` completa con Google Reviews integration
- Páginas legales: Aviso de Privacidad, Términos, Cookies
- Calendly embed (placeholder) en `/contacto/#agenda-calendar`
- Status dinámico WhatsApp flotante (En línea / Asistente 24/7 según horario)

### Added — CRO Sprint 3 (Avanzado)
- Calculadora interactiva de honorarios (3 inputs → rango COP)
- Video hero placeholder con lazy YouTube embed
- Botcake widget lazy-loaded (espera ID de Pancake real)
- Blog completo con TOC dinámico, reading progress bar y Article schema
- Google Maps embed lazy en contacto (Bucaramanga)
- A/B testing framework cookie-based con localStorage sticky
- Conversions tracking infrastructure

### Added — Adaptación legal Colombia
- Sistema Penal Acusatorio (Ley 906 de 2004) como marco principal
- Terminología 100% colombiana: Fiscalía General de la Nación, juez de control de garantías, imputación de cargos, audiencia preliminar, medida de aseguramiento intramural, Habeas Corpus, tutela
- Moneda Pesos Colombianos (COP) con notación $XM para millones
- Plazos: 36 horas para audiencia de legalización de captura (Art. 28 CN)
- Aviso de Privacidad conforme Ley 1581 de 2012 (Habeas Data)
- Términos con jurisdicción Bucaramanga, referencia Ley 1123 (Código Disciplinario Abogado)
- WhatsApp Business Colombia: +57 311 607 4995
- Dirección: Carrera 20 # 15-32, Bucaramanga, Santander
- `lang="es-CO"` + `og:locale="es_CO"` en 27 páginas
- Calculadora honorarios recalibrada a COP

### Added — Infraestructura técnica
- Design system completo (paleta Brasa y Tinta, tipografía DM Serif + Inter)
- 2649 líneas CSS con variables, design tokens, responsive
- 4 módulos JS modulares (script.js, tracking.js, components.js, sprint3.js)
- 964 líneas JS total
- 27 canonical tags
- Open Graph + Twitter Cards en 27/27 páginas
- netlify.toml con headers de seguridad, cache strategy, redirects 301

### Configuration
- WhatsApp Business: ✅ configurado (+57 311 607 4995)
- GA4: 🟡 placeholder (esperando ID del cliente)
- Meta Pixel: 🟡 placeholder
- TikTok Pixel: 🟡 placeholder
- Microsoft Clarity: 🟡 placeholder
- Botcake widget: 🟡 placeholder
- Calendly embed: 🟡 URL placeholder

### Notes — Por cliente (Stephanie)
- Sin referencias a cédula/tarjeta profesional por solicitud expresa
- Foto profesional pendiente — placeholders monograma "SG"
- Bio personal pendiente — placeholders marcados en `sobre-mi.html`
- Cifras agregadas pendientes — placeholders `[##]`, `[Y]+` en microbar y trayectoria

### Stats
- 27 archivos HTML
- 484 KB tamaño total
- 0 dependencias build (vanilla puro)
- 0 links rotos validados
- LCP estimado <1.5s con CDN Netlify

---

## Próximas versiones planeadas

### [1.1.0] — En backlog
- Conexión real con Pancake CRM (webhook desde forms)
- Botcake widget en producción con ID real
- Configuración real Meta Pixel + GA4 con eventos de conversión
- Foto profesional de Stephanie en hero
- Bio personal redactada en `sobre-mi.html`

### [1.2.0] — En backlog
- 5 posts blog adicionales (skeletons → contenido completo)
- Sistema de reseñas Google integrado
- Cookie banner conforme Ley 1581 (consent management)
- Página `/medios/` con apariciones en prensa

### [2.0.0] — Long term
- Migración eventual a WordPress o Astro si crece el equipo
- Sistema multilingüe (es-CO + en para Persona 3 internacional)
- Calculadora avanzada con simulaciones procesales
- Dashboard interno de leads + KPIs
