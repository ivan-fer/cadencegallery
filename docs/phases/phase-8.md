# Fase 8 — Deploy: Cloudflare Pages + dominio

> Runbook de despliegue. La parte de **repo** ya está lista (este commit). La parte de
> **Cloudflare** (conectar Pages y apuntar el DNS) la ejecuta Iván desde su cuenta; Claude
> no tiene acceso. **No publicar a producción sin autorización explícita** (los entornos
> *preview* de Cloudflare sí se pueden usar libremente).

---

## 1. Estado del repo (hecho por Claude)

- **Ruta `styleguide` eliminada** (`src/app/[locale]/styleguide/`). Era un dev aid de la Fase 2;
  ya estaba `noindex` + fuera del sitemap, ahora se quita del todo. Se limpiaron sus referencias
  en `src/app/robots.ts` (sin `disallow`) y `src/app/sitemap.ts` (comentario).
- **Build de producción verificado** (`npm run build`): genera `/out` con
  - `index.html` en la raíz → redirect locale-aware a `/es/` o `/en/` (ver `public/index.html`).
  - `404.html` → Cloudflare Pages lo sirve automáticamente para rutas inexistentes.
  - `robots.txt` (allow `/`, host + sitemap) y `sitemap.xml` (26 URLs = 13 segmentos × 2 idiomas).
  - Páginas estáticas con `trailingSlash` (carpeta + `index.html` por ruta).

> Nota: si al reconstruir aparece un type-error fantasma sobre `styleguide`, es el caché de
> tipos de Next. Borrar `.next/` y volver a `npm run build`.

## 2. Parámetros de build para Cloudflare Pages

Al conectar el repo de GitHub en **Cloudflare Pages → Create application → Connect to Git**:

| Campo | Valor |
|---|---|
| Production branch | `main` |
| Framework preset | `None` (o "Next.js (Static HTML Export)" si lo ofrece) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `24` (variable de entorno `NODE_VERSION=24` si hace falta fijarla) |
| Variables de entorno | ninguna requerida |

- El sitio es 100% estático (`output: 'export'`); no hay funciones ni runtime.
- **No** crear un `_redirects` para la raíz: el redirect de `/` lo hace `public/index.html`
  (JS locale-aware con persistencia de idioma). Un `_redirects` con 302 server-side dispararía
  antes que el JS y rompería la persistencia (decisión registrada en `CLAUDE.md` §6).

## 3. Dominio

`cadencegallery.com` está registrado en Cloudflare pero **sin DNS apuntando** todavía.

1. En el proyecto de Pages → **Custom domains** → agregar `cadencegallery.com` y `www.cadencegallery.com`.
2. Como el dominio ya está en Cloudflare, los registros (CNAME a `*.pages.dev`) se crean
   automáticamente al asignar el custom domain.
3. Decidir canónico: el sitio usa `https://cadencegallery.com` (sin `www`) en `SITE_URL`
   (`src/lib/metadata.ts`), canonical/hreflang y sitemap. Configurar `www` → redirect a apex
   para que coincida con el canónico.
4. SSL: "Full" y dejar que Cloudflare emita el certificado.

## 4. Checklist de validación (preview antes de producción)

Sobre la URL `*.pages.dev` del deploy:

- [ ] `/` redirige a `/es/` (o al idioma del navegador / `localStorage`).
- [ ] `/es/` y `/en/` cargan; switch de idioma y tema (claro/oscuro) funcionan.
- [ ] Detalle de apps: heros y galerías de capturas se ven (Metronome 7 temas, Polypulse 4).
- [ ] `/es/metronome/guides/...` y las legales (`/privacy`, `/terms`) cargan en ambos idiomas.
- [ ] Una ruta inexistente sirve el `404.html`.
- [ ] `/robots.txt` y `/sitemap.xml` responden; el sitemap usa el dominio final.
- [ ] `/styleguide` da 404 (ya no existe).

## 5. Pendientes para después del deploy

- Capturas reales de Polypulse con el mojibake corregido en la app (ver `CLAUDE.md`).
- Iván puede ajustar el copy de apps/home leyéndolo en el sitio.
- Fase 9: pulido visual (animaciones sutiles, micro-interacciones).
