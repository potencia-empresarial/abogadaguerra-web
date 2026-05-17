# 🚀 Deploy GitHub → Netlify · abogadaguerra.com

**Guía ejecutable para Potencia Empresarial · 25 minutos total**

---

## ✅ Estado del repo local

El repositorio Git ya está inicializado con commit inicial. Solo falta:
1. Crear el repo en GitHub
2. Push del código
3. Conectar Netlify
4. DNS

---

## 🎯 PASO 1 — Crear repo en GitHub (3 min)

1. Ve a **https://github.com/organizations/potencia-empresarial/repositories/new** (ajusta el slug si tu organización tiene otro nombre)
2. **Repository name:** `abogadaguerra-web`
3. **Description:** `Sitio web de Stephanie Guerra · Defensa Penal · Bucaramanga · Construido por Potencia Empresarial`
4. **Visibilidad:** 🔒 **Private**
5. **NO** marques "Add README", "Add .gitignore", "Add license" — ya los tenemos en local
6. Click **"Create repository"**

GitHub te muestra instrucciones para subir un repo existente. **Las que ya están listas en este proyecto son las de "…or push an existing repository from the command line".**

---

## 🎯 PASO 2 — Push inicial al repo (2 min)

Abre terminal en la carpeta del proyecto:

```bash
cd "/Users/user/Claude Code/Laboratorio/Abogada_Guerra/sitio_web"

# Renombrar branch a main (si no lo está ya)
git branch -M main

# Agregar el remote (cambia 'potencia-empresarial' por el slug real de tu org)
git remote add origin git@github.com:potencia-empresarial/abogadaguerra-web.git

# (Si no usas SSH, usa HTTPS:)
# git remote add origin https://github.com/potencia-empresarial/abogadaguerra-web.git

# Push inicial
git push -u origin main
```

GitHub te pide credenciales si no tienes SSH key configurada.

### Crear branch staging

```bash
git checkout -b staging
git push -u origin staging
```

✅ Ahora tienes ambas branches en GitHub.

---

## 🎯 PASO 3 — Conectar Netlify al repo (5 min)

1. Ve a **https://app.netlify.com** (login con tu cuenta Potencia)
2. Click **"Add new site"** → **"Import an existing project"**
3. Elige **"Deploy with GitHub"**
4. Autoriza Netlify a acceder a tu organización GitHub
5. Busca y selecciona `abogadaguerra-web`
6. Configuración de build:
   - **Owner:** Tu cuenta Potencia (no Stephanie)
   - **Branch to deploy:** `main`
   - **Base directory:** dejar vacío (root)
   - **Build command:** dejar vacío (sitio estático)
   - **Publish directory:** `.` (root)
7. **Site name:** click "Site settings" → "Change site name" → escribir `abogadaguerra`
   (Esto te da `abogadaguerra.netlify.app` como URL temporal)
8. Click **"Deploy site"**
9. Espera ~60 segundos
10. ✅ Sitio vivo en `https://abogadaguerra.netlify.app`

### Configurar branch staging como preview

1. En tu sitio → **Site settings → Build & deploy → Continuous deployment → Branches**
2. Click **"Edit settings"** en "Branches and deploy contexts"
3. **Branch deploys:** elegir **"Let me add individual branches"**
4. Agregar `staging` a la lista
5. Save

Ahora `staging` despliega automáticamente a `staging--abogadaguerra.netlify.app`.

---

## 🎯 PASO 4 — Configurar branch protection en GitHub (3 min)

1. Ve a tu repo `abogadaguerra-web` → **Settings → Branches**
2. Click **"Add branch ruleset"** o **"Add rule"** (depende de la UI actual)
3. **Branch name pattern:** `main`
4. Activar:
   - ☑ Require pull request before merging
   - ☑ Require approvals: 1
   - ☑ Require review from Code Owners
   - ☑ Require status checks to pass before merging
   - ☑ Require branches to be up to date before merging
   - ☑ Do not allow bypassing the above settings
5. Save

Repite para `staging` con menos restricciones (sin approval required).

---

## 🎯 PASO 5 — Conectar dominio abogadaguerra.com (10 min)

### 5.1 En Netlify

1. **Site settings → Domain management**
2. Click **"Add custom domain"**
3. Escribir `abogadaguerra.com` → Verify → Yes, add domain
4. Netlify pregunta si Stephanie ya tiene el dominio o si lo registras nuevo. Como ya está registrado: **"Yes, I have it"**
5. Netlify te muestra los 4 nameservers para apuntar (algo como `dnsX.p07.nsone.net`)

### 5.2 En el proveedor de dominio (donde Stephanie lo compró)

1. Login al panel del proveedor (GoDaddy, Namecheap, Hostinger, etc.)
2. Sección **"DNS"** o **"Nameservers"** del dominio `abogadaguerra.com`
3. Cambiar nameservers a los 4 que dio Netlify
4. Guardar

⏱️ Propagación: 5 min a 24h (usualmente <2h)

### 5.3 Activar SSL automático

1. Netlify detecta cuando el DNS propagó
2. Domain settings → HTTPS → Verify DNS configuration
3. Click **"Provision certificate"** (Let's Encrypt automático)
4. Activar **"Force HTTPS"** toggle
5. ✅ Sitio vivo en `https://abogadaguerra.com` con SSL

---

## 🎯 PASO 6 — Verificación final (3 min)

Abre y prueba:

- [ ] `https://abogadaguerra.com` → Home con microbar arriba
- [ ] `https://abogadaguerra.com/honorarios.html` → Calculadora calcula bien
- [ ] `https://abogadaguerra.com/blog/` → 10 posts visibles
- [ ] `https://abogadaguerra.com/wa` → Redirige a WhatsApp +57 311 607 4995
- [ ] `https://abogadaguerra.com/guia` → Redirige a Guía Emergencia
- [ ] Mobile (abrir en celular) → Botón verde "Hablar" visible arriba

### Validar SEO
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) → ingresa `https://abogadaguerra.com` → debe mostrar OG correcto
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) → ingresa `/preguntas-frecuentes.html` → debe detectar FAQPage

---

## 🎯 PASO 7 — Post-deploy SEO (5 min)

### Google Search Console
1. Ve a **https://search.google.com/search-console**
2. "Agregar propiedad" → "Prefijo de URL" → `https://abogadaguerra.com`
3. Verificar (opción más fácil: registro TXT en DNS — Netlify lo soporta vía Domain settings)
4. Sitemaps → ingresar `sitemap.xml` → Enviar

### Bing Webmaster
1. **https://www.bing.com/webmasters**
2. Importar desde Google Search Console (botón directo)

### Google Business Profile (Stephanie)
1. **https://business.google.com**
2. Crear ficha:
   - Nombre: Abogada Guerra · Stephanie Guerra
   - Categoría: Abogado / Defensa criminal
   - Dirección: Carrera 20 # 15-32, Bucaramanga, Santander
   - Teléfono: +57 311 607 4995
   - Web: https://abogadaguerra.com
3. Verificación por correo postal (Google envía postal a la dirección)

---

## 🔄 Workflow continuo (después del go-live)

### Hacer un cambio
```bash
git checkout staging
git pull origin staging
git checkout -b feat/algo-nuevo
# ... cambios ...
git add .
git commit -m "feat(scope): descripción"
git push origin feat/algo-nuevo
# Abrir PR en GitHub: feat/* → staging
# Netlify genera preview en staging--abogadaguerra.netlify.app
# Validar
# Merge a staging
# Si queda OK, abrir PR staging → main
# Aprobar (CODEOWNERS) → merge → deploy auto a producción
```

### Cambios urgentes (hotfix)
```bash
git checkout main
git pull origin main
git checkout -b hotfix/descripcion
# ... fix ...
git commit -m "fix(scope): descripción urgente"
git push origin hotfix/descripcion
# PR hotfix/* → main (saltarse staging por urgencia documentada)
```

---

## 🆘 Troubleshooting

### "Permission denied (publickey)" al hacer git push
Tu SSH key no está configurada con GitHub. Soluciones:
- **Opción A:** Configurar SSH key — [Guía oficial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- **Opción B:** Usar HTTPS — cambia el remote:
  ```bash
  git remote set-url origin https://github.com/potencia-empresarial/abogadaguerra-web.git
  ```
  GitHub te pedirá username + Personal Access Token (no password)

### Netlify no detecta el repo
- Verifica que autorizaste Netlify a acceder a la org de Potencia
- En GitHub → Settings de la org → Third-party access → permitir Netlify

### Branch protection no permite hacer commit directo
- ✅ Está funcionando como debería
- Siempre via PR

### El DNS no propaga
- Espera hasta 24h
- Verifica con [whatsmydns.net](https://whatsmydns.net)
- Si pasan >24h: verifica que pusiste los nameservers correctos

### SSL no se activa
- Espera 30 min después del DNS propagado
- Si pasan >2h: Domain settings → Renew SSL certificate

---

## 📞 Contactos importantes

- **GitHub org Potencia:** github.com/potencia-empresarial (ajustar slug real)
- **Netlify dashboard:** app.netlify.com
- **Cliente:** Stephanie Guerra · +57 311 607 4995
- **Soporte Potencia:** gerencia@potenciaempresarial.site

---

**Tiempo total:** 25 minutos desde cero hasta sitio en producción con CI/CD completo.
