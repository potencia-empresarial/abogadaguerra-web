# 🚀 Guía de Deploy — abogadaguerra.com en Netlify (15 minutos)

**Recomendación:** Netlify free tier es la opción ideal para este sitio (HTML/CSS/JS estático).
**Ventajas:** SSL gratis, CDN global, deploy automático, 100 GB/mes ancho de banda, formularios incluidos.
**Costo:** $0/mes para este sitio.

---

## 📋 Pasos para publicar el sitio en abogadaguerra.com

### 1. Crear cuenta en Netlify (2 min)

1. Ir a [https://netlify.com](https://netlify.com)
2. Click "Sign up" → Elegir método (Email, GitHub, Google)
3. Verificar email

### 2. Subir el sitio (3 min)

**Opción A — Drag and drop (la más fácil):**
1. En Netlify Dashboard → click "Add new site" → "Deploy manually"
2. Arrastrar la carpeta completa `/sitio_web/` al área indicada
3. Esperar 60-90 segundos
4. Netlify asigna URL temporal: `https://xxxxx.netlify.app`
5. Verifica que se ve bien

**Opción B — Conectar con GitHub (deploy automático):**
1. Subir `/sitio_web/` a un repo de GitHub (recomendado: privado)
2. En Netlify → "Add new site" → "Import from Git"
3. Autorizar GitHub → seleccionar repo
4. Build settings:
   - Build command: (dejar vacío)
   - Publish directory: `.` o `/`
5. Click "Deploy"
6. Cada `git push` despliega automáticamente

### 3. Conectar el dominio abogadaguerra.com (5 min)

1. En tu sitio en Netlify → **Site settings → Domain management → Add custom domain**
2. Escribir `abogadaguerra.com` → click "Verify"
3. Netlify te muestra 2 opciones:

#### Opción A — Usar DNS de Netlify (recomendado)
Cambia los **nameservers** de tu dominio (donde lo compraste) a:
```
dns1.p07.nsone.net
dns2.p07.nsone.net
dns3.p07.nsone.net
dns4.p07.nsone.net
```
(Los servers exactos te los da Netlify)

#### Opción B — Apuntar registros DNS manualmente
En tu proveedor de dominio (GoDaddy/Namecheap/Cloudflare/donde compraste):
- **Tipo A:** apunta `@` (root) a `75.2.60.5`
- **Tipo CNAME:** apunta `www` a `xxxxx.netlify.app`

### 4. Activar SSL (1 min, automático)

1. Netlify detecta el dominio conectado
2. En 5-30 minutos, Let's Encrypt emite el certificado SSL
3. Activa "Force HTTPS" en Domain settings
4. Tu sitio queda en `https://abogadaguerra.com` con SSL

### 5. Configurar redirects clave (2 min)

Crear archivo `_redirects` en la raíz del sitio:

```
# Redirigir www a no-www
https://www.abogadaguerra.com/* https://abogadaguerra.com/:splat 301!

# Redirects útiles para SEO
/blog https://abogadaguerra.com/blog/ 301
/guia https://abogadaguerra.com/guia-emergencia-12-horas.html 301
/checklist https://abogadaguerra.com/checklist-nsjp.html 301
/whitepaper https://abogadaguerra.com/whitepaper-defensa-empresarial.html 301

# 404 personalizado (opcional)
/* /404.html 404
```

### 6. Configurar headers (seguridad) — 2 min

Crear archivo `_headers` en la raíz:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  X-XSS-Protection: 1; mode=block

# Cache static assets fuerte
/css/*
  Cache-Control: public, max-age=31536000, immutable
/js/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## ✅ Checklist post-deploy

- [ ] Sitio visible en `https://abogadaguerra.com`
- [ ] SSL activo (candado verde en navegador)
- [ ] WWW redirige a no-WWW
- [ ] Probar las 27 páginas cargan correctamente
- [ ] Probar forms multi-step (3 forms críticos: LM, contact, WP)
- [ ] Probar calculadora honorarios
- [ ] Probar WhatsApp flotante con número Colombia +57 311 607 4995
- [ ] Verificar canonical en source de cada página
- [ ] Verificar Open Graph en [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Verificar Twitter Card en [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verificar Schema en [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Submit `sitemap.xml` a Google Search Console
- [ ] Submit a Bing Webmaster Tools

---

## 🛡️ Costos esperados

| Item | Costo mensual |
|---|---|
| Dominio abogadaguerra.com (renovación anual) | ~$15 USD/año |
| Netlify Free tier | $0 USD |
| Cloudflare (opcional CDN/security) | $0 USD |
| **TOTAL infraestructura web** | **~$15 USD/año** |

---

## 🔄 Workflow de actualizaciones futuras

**Si usas drag-and-drop:**
1. Editar archivos localmente
2. Re-arrastrar carpeta a Netlify
3. Sitio actualizado en 60 segundos

**Si usas Git:**
1. Editar archivos localmente
2. `git add . && git commit -m "..." && git push`
3. Netlify deploya automáticamente

---

## 🆘 Soporte y troubleshooting

**El dominio no apunta tras 24h:**
- Verifica nameservers o registros DNS
- Usa [whatsmydns.net](https://whatsmydns.net) para ver propagación

**SSL no se activa:**
- Espera hasta 30 min
- Si tarda más, en Netlify → Domain settings → Renew SSL certificate

**Forms no envían:**
- Pancake webhook no configurado aún
- Mientras tanto, forms redirigen a WhatsApp con texto pre-llenado (funciona en producción)

**Loading lento:**
- Netlify CDN ya optimiza
- Si hay problema, activa "Asset optimization" en Site settings

---

**Tiempo total de deploy:** 15 minutos desde cero hasta sitio publicado en `https://abogadaguerra.com`.
