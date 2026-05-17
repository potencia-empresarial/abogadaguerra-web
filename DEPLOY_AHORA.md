# 🚀 DEPLOY abogadaguerra.com — Guía Ejecutable (15 minutos)

**Fecha:** 2026-05-17
**Estado del sitio:** ✅ Pre-deploy checks PASSED — listo para producción
**Archivo a usar:** `abogadaguerra-com-deploy.zip` (153 KB) — en la carpeta padre del sitio

---

## ✅ Pre-Deploy Validation (ya pasado)

| Check | Resultado |
|---|---|
| Links rotos | ✅ 0 |
| Canonical tags | ✅ 27/27 páginas |
| HTML válido (DOCTYPE, lang=es-CO, charset, title) | ✅ 27/27 |
| Open Graph + Twitter Cards | ✅ 27/27 |
| Sitemap.xml | ✅ Generado con 27 URLs |
| Robots.txt | ✅ Generado |
| _redirects (Netlify) | ✅ Generado |
| _headers (Netlify) | ✅ Generado |
| WhatsApp Colombia +57 311 607 4995 | ✅ Configurado en JS |
| Tamaño total | ✅ 484 KB (rapidísimo) |
| Adaptación legal Colombia | ✅ 100% (Ley 906, Ley 1581, COP) |
| Sin cédula/tarjeta profesional | ✅ Validado |
| Placeholders México eliminados | ✅ Validado |

---

## 🎯 PASO 1 — Crear cuenta Netlify (3 min)

1. Abre **https://app.netlify.com/signup** en tu navegador
2. Recomiendo signup con **GitHub** o **Google** (más rápido). Email también funciona.
3. Una vez dentro, verás el dashboard.

---

## 🎯 PASO 2 — Deploy del sitio por drag-and-drop (2 min)

1. En el dashboard de Netlify, click en **"Add new site"** (botón verde arriba a la derecha)
2. Selecciona **"Deploy manually"**
3. Verás una zona grande que dice **"Drag and drop your site output folder here"**
4. **Opción A — Arrastra el ZIP:**
   - Localiza el archivo `abogadaguerra-com-deploy.zip` en:
     `/Users/user/Claude Code/Laboratorio/Abogada_Guerra/abogadaguerra-com-deploy.zip`
   - Arrástralo a la zona indicada de Netlify
5. **Opción B — Arrastra la carpeta:**
   - Localiza la carpeta `sitio_web` en:
     `/Users/user/Claude Code/Laboratorio/Abogada_Guerra/sitio_web`
   - Arrástrala completa a la zona indicada
6. **Espera ~60 segundos** mientras Netlify procesa
7. Al terminar, te muestra una URL temporal tipo:
   `https://incredible-cookie-abc123.netlify.app`
8. **Verifica que el sitio carga correctamente** en esa URL temporal

✅ **El sitio ya está vivo en Internet** (con dominio temporal). Falta conectar `abogadaguerra.com`.

---

## 🎯 PASO 3 — Conectar dominio abogadaguerra.com (5 min)

1. En el dashboard de tu sitio en Netlify, click en **"Domain settings"** o **"Set up a custom domain"**
2. Click en **"Add custom domain"**
3. Escribe `abogadaguerra.com` → click **"Verify"** → click **"Yes, add domain"**
4. Netlify dirá: *"Check DNS configuration"* y te mostrará la opción de usar:

### 🅰️ Opción A — Usar nameservers de Netlify (RECOMENDADO, más simple)

Netlify te muestra 4 nameservers, algo así:
```
dns1.p07.nsone.net
dns2.p07.nsone.net
dns3.p07.nsone.net
dns4.p07.nsone.net
```

1. Anota esos nameservers (los exactos te los da Netlify)
2. Ve a tu proveedor donde compraste el dominio (GoDaddy / Namecheap / Hostinger / etc.)
3. Busca **"DNS"** o **"Nameservers"** del dominio
4. **Cambia los nameservers** por los 4 que te dio Netlify
5. Guarda

⏱️ Propagación: 5 minutos a 24 horas (usualmente <2 horas)

### 🅱️ Opción B — Registros DNS manuales (si prefieres mantener tu DNS actual)

En tu proveedor de dominio agrega/edita:

| Tipo | Nombre | Valor | TTL |
|---|---|---|---|
| **A** | `@` (root) | `75.2.60.5` | 3600 |
| **CNAME** | `www` | `xxxxx.netlify.app` (la URL temporal de tu sitio) | 3600 |

⏱️ Propagación: similar.

---

## 🎯 PASO 4 — Activar HTTPS / SSL (automático, 1 min)

1. Una vez que el DNS propague, Netlify detecta el dominio
2. En **Domain settings → HTTPS**, click en **"Verify DNS configuration"**
3. Cuando esté verificado, click **"Provision certificate"** (es Let's Encrypt gratis)
4. Espera 30 segundos a 5 minutos
5. Activa **"Force HTTPS"** (toggle on)
6. ✅ Tu sitio ya está en `https://abogadaguerra.com` con SSL

---

## 🎯 PASO 5 — Verificación final (2 min)

Abre estas URLs y confirma que funcionan:

- [ ] `https://abogadaguerra.com` → Home con microbar arriba
- [ ] `https://abogadaguerra.com/sobre-mi.html` → Bio Stephanie
- [ ] `https://abogadaguerra.com/honorarios.html` → Calculadora funcional (prueba clickear)
- [ ] `https://abogadaguerra.com/blog/` → Blog con 10 posts
- [ ] `https://abogadaguerra.com/guia-emergencia-12-horas.html` → Lead magnet con form
- [ ] `https://abogadaguerra.com/aviso-de-privacidad.html` → Ley 1581
- [ ] Probar redirects: `https://abogadaguerra.com/wa` → debe redirigir a WhatsApp +57 311 607 4995
- [ ] Mobile: abre el sitio en tu celular, verifica el botón verde "Hablar"

---

## 🎯 PASO 6 — Post-Deploy SEO (5 min)

### 6.1 — Submit sitemap a Google Search Console
1. Ve a **https://search.google.com/search-console**
2. Click **"Agregar propiedad"** → elige **"Prefijo de URL"** → ingresa `https://abogadaguerra.com`
3. Verifica propiedad (Netlify tiene método de verificación HTML upload o DNS — el más fácil: agregar registro TXT en DNS)
4. Una vez verificado, ve a **"Sitemaps"** (menú izquierdo)
5. Ingresa: `sitemap.xml` → click **"Enviar"**
6. ✅ Google empieza a indexar

### 6.2 — Submit a Bing Webmaster Tools (recomendado)
1. Ve a **https://www.bing.com/webmasters**
2. Importa la propiedad desde Google Search Console (botón directo)
3. Verifica que el sitemap se importó

### 6.3 — Crear Google Business Profile
1. Ve a **https://business.google.com**
2. Crea perfil para "Abogada Guerra"
3. Datos a usar:
   - **Nombre:** Abogada Guerra · Stephanie Guerra
   - **Categoría:** Abogado / Bufete de abogados
   - **Dirección:** Carrera 20 # 15-32, Bucaramanga, Santander
   - **Teléfono:** +57 311 607 4995
   - **Website:** https://abogadaguerra.com
   - **Horarios:** L-V 9:00-19:00, urgencias 24/7
4. Espera verificación postal (Google envía postal con código a la dirección)
5. Una vez verificado → publica fotos + 3 primeras reseñas de clientes ya cerrados

### 6.4 — Verificar Open Graph (compartir en redes se ve bien)
1. Ve a **https://developers.facebook.com/tools/debug/**
2. Ingresa `https://abogadaguerra.com` → click "Depurar"
3. Si no se ve preview, click "Volver a buscar"
4. Confirma que se ve: título, descripción y aparece (sin imagen aún hasta subir OG image)

### 6.5 — Verificar Schema markup
1. Ve a **https://search.google.com/test/rich-results**
2. Ingresa `https://abogadaguerra.com/preguntas-frecuentes.html`
3. Confirma que detecta **FAQPage** con las 12 preguntas
4. Repite con `/blog/que-hacer-si-capturaron-a-un-familiar.html` → debe detectar **Article**

---

## 🎯 PASO 7 — Workflow de futuras actualizaciones (cuando tengas cambios)

**Si haces cambios al código localmente:**

1. Edita los archivos en `/Users/user/Claude Code/Laboratorio/Abogada_Guerra/sitio_web/`
2. Re-zip o re-empaqueta la carpeta
3. En Netlify → tu sitio → **"Deploys"** → arrastra el nuevo ZIP/carpeta
4. Listo: nuevo deploy en 60 segundos, dominio sigue activo

**Mejor flujo a futuro:** conectar con GitHub
1. Subir `sitio_web/` a repo GitHub privado
2. En Netlify: Site settings → Build & deploy → Link to Git repository
3. Cada `git push` despliega automáticamente

---

## 📋 Resumen de URLs útiles

| Recurso | URL |
|---|---|
| Netlify dashboard | https://app.netlify.com |
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster | https://www.bing.com/webmasters |
| Google Business Profile | https://business.google.com |
| Facebook Debugger | https://developers.facebook.com/tools/debug/ |
| Rich Results Test | https://search.google.com/test/rich-results |
| Pixel Helper Chrome | https://chrome.google.com/webstore/detail/meta-pixel-helper/ |

---

## ⚠️ Cosas a tener en mente

### Lo que YA funciona en producción
- ✅ Sitio público accesible
- ✅ Calculadora honorarios COP
- ✅ Forms multi-step (mostrarán pantalla de éxito + abrirán WhatsApp con el mensaje)
- ✅ WhatsApp flotante con número Colombia real
- ✅ Reading progress + TOC en blog posts
- ✅ Exit-intent modal (en P1 y honorarios)
- ✅ Newsletter signup (logs en consola hasta conectar MailerLite)
- ✅ Toda la SEO técnica (sitemap, schema, canonical, OG)

### Lo que está en placeholder hasta que llegue
- 🟡 **Foto de Stephanie:** placeholders monograma "SG" — funciona, pero menos cálido
- 🟡 **GA4 / Meta Pixel / TikTok Pixel / Clarity:** scripts cargados pero sin ID → no envían datos hasta que cambies los IDs en `js/tracking.js`
- 🟡 **Botcake widget:** se cargaría al setear `BOTCAKE_ID` en `js/tracking.js`
- 🟡 **Calendly real:** widget con URL placeholder en contacto

**Estos son cambios de 1 línea en `js/tracking.js`** cuando lleguen los datos. No requieren re-deploy del sitio completo.

---

## 🆘 Troubleshooting común

**"Mi dominio no carga aún"**
- Espera hasta 24 horas para propagación DNS completa
- Verifica en https://www.whatsmydns.net que tus nameservers/registros estén propagados globalmente

**"Aparece 'Not secure' (no candado)"**
- SSL toma 5-30 min después del DNS propagado
- Si pasan >1 hora: Domain settings → Renew SSL certificate

**"El formulario no envía"**
- Los forms multi-step actualmente abren WhatsApp con mensaje pre-llenado (esto funciona en producción)
- Para guardar leads en CRM, conectar `js/components.js` función `handleFormSubmit` al webhook de Pancake (ver `06_Pancake_Ecosistema/02_Pancake_Setup_Playbook.md`)

**"Calculadora no calcula"**
- Verifica que `js/sprint3.js` esté cargado (Inspector → Network → buscar sprint3.js status 200)

---

## ✅ Checklist completo de Go-Live

- [ ] Cuenta Netlify creada
- [ ] Sitio desplegado (drag-drop ZIP o carpeta)
- [ ] URL temporal `.netlify.app` funcionando
- [ ] Dominio `abogadaguerra.com` agregado
- [ ] DNS actualizado (nameservers o registros A/CNAME)
- [ ] HTTPS/SSL activo (candado verde)
- [ ] "Force HTTPS" activado
- [ ] Probadas todas las URLs principales
- [ ] Mobile funcionando
- [ ] Sitemap submitido a Google Search Console
- [ ] Google Business Profile creado (en proceso de verificación postal)
- [ ] Open Graph verificado con Facebook Debugger
- [ ] Schema verificado con Rich Results Test
- [ ] (Opcional) Bing Webmaster sitemap importado

---

## 🎉 Cuando termines

Tienes oficialmente **abogadaguerra.com viviendo en Internet**, listo para empezar a recibir tráfico orgánico y pagado.

**Próximo bloque sugerido:**
- Configurar Meta Business: instalar Pixel ID en `js/tracking.js` y subir el sitio de nuevo
- Configurar Pancake (Multichat + Botcake + CRM) siguiendo el playbook
- Empezar a publicar el plan editorial (12 reels guionizados ya listos)
- Solicitar primeras 5 reseñas Google a clientes ya cerrados

— Potencia Empresarial · 2026
