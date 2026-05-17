# Guía de Contribución · abogadaguerra.com

Esta guía documenta cómo el equipo de Potencia Empresarial contribuye al proyecto.

---

## 🌳 Estrategia de branches

```
main         ← producción (abogadaguerra.com)
  ↑
staging      ← preview pública (staging--abogadaguerra.netlify.app)
  ↑
feature/*    ← branches de trabajo (1 por feature/fix)
```

**Reglas:**
- ❌ NUNCA hacer commit directo a `main` (protegido por reglas GitHub)
- ❌ NUNCA hacer commit directo a `staging`
- ✅ TODO cambio pasa por PR

---

## 📝 Convención de commits — Conventional Commits

Formato: `<tipo>(<scope opcional>): <descripción imperativa>`

### Tipos permitidos

| Tipo | Descripción | Ejemplo |
|---|---|---|
| `feat` | Nueva funcionalidad | `feat(calculadora): agregar opción "ley de extinción dominio"` |
| `fix` | Corrección de bug | `fix(forms): corregir validación de email en LM` |
| `docs` | Documentación | `docs(readme): actualizar workflow de deploy` |
| `style` | Formato CSS, espaciado | `style(hero): ajustar padding mobile <540px` |
| `refactor` | Refactor sin cambio funcional | `refactor(js): extraer URL builder a tracking.js` |
| `perf` | Mejora de performance | `perf(fonts): preload DM Serif 400` |
| `chore` | Configuración, deps | `chore(netlify): actualizar headers cache CSS` |
| `content` | Copy / contenido | `content(blog): publicar post sobre habeas corpus` |
| `legal` | Cambio legal Colombia | `legal(privacidad): actualizar referencia a Decreto 1377` |
| `seo` | Cambios SEO | `seo(home): mejorar meta description con keywords intent` |

### Scopes comunes
- `home`, `blog`, `honorarios`, `contacto`, `forms`, `calculadora`, `tracking`, `seo`, `legal`, `mobile`, `desktop`, `pancake`, `meta-pixel`, `ga4`

### Ejemplos buenos

```bash
git commit -m "feat(home): agregar contador familias defendidas dinámico"
git commit -m "fix(mobile): WhatsApp flotante tapaba CTA hero en iPhone SE"
git commit -m "content(blog): publicar artículo 'Detención en flagrancia'"
git commit -m "legal(terminos): actualizar referencia jurisdicción Floridablanca"
git commit -m "chore(deps): actualizar Phosphor Icons a v2.1"
```

### Ejemplos a evitar

```bash
git commit -m "cambios"              # ❌ vago
git commit -m "fix"                   # ❌ sin descripción
git commit -m "Actualicé el home"    # ❌ no imperativo, no especifica scope
git commit -m "Update"                # ❌ inútil
```

---

## 🔄 Workflow de un PR típico

```bash
# 1. Sincronizar staging
git checkout staging
git pull origin staging

# 2. Crear branch
git checkout -b feat/calculadora-extension-dominio

# 3. Hacer cambios + commits granulares
git add js/sprint3.js
git commit -m "feat(calculadora): agregar etapa extinción dominio"

git add honorarios.html
git commit -m "feat(calculadora): mostrar opción extinción dominio en UI"

git add CHANGELOG.md
git commit -m "docs(changelog): agregar entrada [1.1.0] extinción dominio"

# 4. Push
git push origin feat/calculadora-extension-dominio

# 5. Abrir PR en GitHub (feat/* → staging)
# Llenar plantilla de PR
# Esperar review

# 6. Tras merge a staging, Netlify genera preview
# Validar en staging--abogadaguerra.netlify.app

# 7. Cuando esté OK, abrir PR staging → main
# Gerencia aprueba
# Merge = deploy a producción automático
```

---

## 🧪 Pre-flight checks antes de abrir PR

### Manual
1. **Probar localmente**: `python3 -m http.server` y revisar páginas afectadas
2. **Validar HTML**: si tocas un HTML, verifica DOCTYPE, `lang="es-CO"`, charset, title, canonical
3. **Probar mobile**: DevTools → device toolbar → iPhone SE (320px) y iPad
4. **Probar links**: navega manualmente entre páginas afectadas
5. **Probar forms**: si tocaste un form multi-step, completa el flujo

### Automatizable (futuro CI/CD)
- HTML validator
- Lighthouse score
- Link checker
- Sitemap consistency

---

## 🇨🇴 Reglas de contenido Colombia

**SIEMPRE:**
- Usar terminología Colombia: Fiscalía (no MP), imputación (no vinculación), Ley 906 (no NSJP), tutela/habeas corpus (no amparo), captura (no detención), defensor público (no de oficio)
- Moneda Pesos Colombianos (COP) con notación $XM para millones
- Citar artículos del Código Penal o Procedimiento Penal cuando aplique (ej. Art. 313 CPP)
- Referencias geográficas: Bucaramanga, Santander, Floridablanca, Girón, Piedecuesta
- Idioma `lang="es-CO"`, locale `es_CO`

**NUNCA:**
- Referencias a cédula/tarjeta profesional (solicitud expresa del cliente)
- Promesas de resultados ("te saco libre")
- Garantías ("te lo aseguro")
- Mencionar clientes reales o casos identificables
- Honorarios "garantizados" o "te devuelvo si pierdo"

---

## 🚨 Cambios sensibles que requieren aprobación de cliente

Antes de mergear a main, validar con Stephanie:
- Cambios en honorarios publicados
- Cambios en testimonios
- Cambios en sobre-mi (bio profesional)
- Cambios en políticas legales (privacidad, términos, cookies)
- Lanzamiento de nuevos lead magnets

Cambios que NO requieren aprobación (Potencia decide):
- Mejoras CRO técnicas (CTAs, layout)
- Optimizaciones de performance
- A/B tests
- Updates de tracking/analytics
- Bugfixes

---

## 🔒 Branch Protection (configurado en GitHub)

`main`:
- ✅ Requiere PR antes de merge
- ✅ Requiere 1 aprobación de CODEOWNER
- ✅ Requiere ramas actualizadas con main antes de merge
- ✅ Requiere status checks (Netlify deploy preview OK)
- ❌ Permite force push deshabilitado
- ❌ Permite delete branch deshabilitado

`staging`:
- ✅ Requiere PR antes de merge
- ✅ No requiere aprobación (más ágil)
- ✅ Auto-delete branches después de merge

---

## 📞 Cuando hay duda

- Cambios legales/copy editorial → consultar gerencia + cliente
- Cambios técnicos → consultar dev senior
- Cambios marketing/tracking → consultar equipo de marketing
- Emergencias en producción → revertir commit y abrir hotfix branch
