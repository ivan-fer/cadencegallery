# CLAUDE.md — Cadence Gallery (Sitio Web)

> Memoria operativa del proyecto entre sesiones. Se actualiza al cerrar cada fase.
> La especificación maestra e inmutable está en `docs/PROJECT_BRIEF.md`. Este archivo
> registra las decisiones tomadas, el estado actual y cómo trabajar en el repo.

---

## 1. Visión del proyecto

Sitio web público de **Cadence Gallery**: la "casa" de la marca paraguas que agrupa apps
musicales hechas con cuidado (hoy: **Cadence Metronome** y **Cadence Polypulse**). Es una
landing minimalista, técnica y elegante que (1) presenta la marca y sus apps, (2) aloja la
documentación legal para publicar en App Store / Google Play (privacidad, términos) y (3)
documenta el uso de las apps con guías breves. Es un **sitio estático bien hecho**, no una
plataforma compleja. Tono de referencia: estudios independientes con personalidad
(Panic, Ableton, Native Instruments), nunca "landing genérica de SaaS".

---

## 2. Stack técnico final (versiones fijadas 2026-06-13)

| Paquete | Versión | Rol |
|---|---|---|
| `next` | 16.2.9 | Framework — App Router + static export |
| `react` / `react-dom` | 19.2.7 | UI (requerido por Next 16) |
| `typescript` | 5.x estable | Tipado estricto |
| `tailwindcss` | 4.3.1 | Estilos (config CSS-first, ver §5) |
| `next-intl` | 4.13.0 | Internacionalización |
| `lucide-react` | última | Iconos |
| `clsx` | última | Merge de clases |
| `eslint` + `prettier` + `prettier-plugin-tailwindcss` | — | Calidad de código |

- **Node**: v24 (entorno de desarrollo actual).
- **Output**: `output: 'export'` — HTML/CSS/JS estático, sin servidor.
- **Deploy**: Cloudflare Pages conectado al repo de GitHub. Dominio `cadencegallery.com`
  (registrado en Cloudflare; sin DNS apuntando todavía).

---

## 3. Reglas de arquitectura

### Estructura de carpetas

```
cadencegallery/
├── design/                      ← fuentes de diseño (NO se sirven)
│   ├── brand/                   (brand kit: SVG, icons/, fuente, manifest)
│   └── screenshots/             (capturas fuente de Metronome)
├── docs/
│   ├── PROJECT_BRIEF.md         ← spec maestra (inmutable)
│   └── phases/                  ← un phase-N.md por fase (log de implementación)
├── public/                      ← assets servidos
│   ├── favicon.ico
│   ├── site.webmanifest         (rutas de iconos → /brand/icons/...)
│   ├── brand/                   (copia servible del kit: favicon.svg, icons/, lockups, marks)
│   └── screenshots/             (capturas optimizadas a WebP para el sitio)
├── src/
│   ├── app/
│   │   └── [locale]/            (todas las páginas viven bajo el segmento de idioma)
│   │       ├── layout.tsx
│   │       ├── page.tsx                     (home)
│   │       ├── metronome/page.tsx
│   │       ├── metronome/guides/...
│   │       ├── polypulse/page.tsx
│   │       ├── polypulse/guides/...
│   │       ├── privacy/page.tsx
│   │       └── terms/page.tsx
│   ├── components/
│   │   ├── ui/                  (Button, Card, Container, Section, ScreenshotPlaceholder…)
│   │   └── layout/             (Header, Footer, ThemeToggle, LocaleSwitch)
│   ├── lib/                     (config i18n, helpers de metadata, structured-data)
│   ├── fonts/                   (Manrope-VariableFont_wght.ttf para next/font/local)
│   └── styles/                  (globals.css con @theme de Tailwind v4)
├── messages/                    ← traducciones next-intl
│   ├── es/  (common, home, metronome, polypulse, privacy, terms .json)
│   └── en/  (misma estructura)
├── CLAUDE.md
├── README.md
├── package.json
├── tsconfig.json
├── next.config.mjs
└── .gitignore
```

### Reglas de dependencia / convenciones de import

- Las páginas viven **siempre** bajo `src/app/[locale]/`. No hay rutas sin prefijo de idioma.
- `components/ui/` = primitivos de presentación sin lógica de dominio; `components/layout/` =
  estructura de página (header, footer, switches).
- Imports con alias `@/` apuntando a `src/` (configurado en `tsconfig.json`).
- Ningún texto visible se hardcodea: todo sale de `messages/<locale>/*.json` vía next-intl.
- `design/` nunca se importa desde `src/`; es fuente de verdad. Lo servible se copia a `public/`.

---

## 4. Convenciones de código

- **TypeScript estricto** (`strict: true`), sin `any` salvo justificación puntual.
- **Naming**: componentes `PascalCase`, archivos de componente `PascalCase.tsx`, utilidades
  `camelCase.ts`, archivos de traducción `kebab/lowercase.json` por namespace.
- **Traducciones**: un archivo JSON por sección/página (`home.json`, `metronome.json`, …),
  claves anidadas por bloque (`hero.title`, `features.items.0`). `es/` y `en/` mantienen
  estructura de claves idéntica.
- **Estilos**: utilidades Tailwind; clases condicionales con `clsx`. Sin CSS-in-JS.
- **Iconos**: `lucide-react`, siempre con `aria-label` o `aria-hidden` según contexto.
- **Commits**: atómicos, conventional commits, uno por TODO significativo.
- **Estado del repo**: sin warnings de lint, sin errores de TypeScript, sin `console.log`
  olvidados. Validación visual (`next dev` + navegador) tras cada cambio significativo.

---

## 5. Sistema de diseño

### Paleta de marca (del brand kit, `design/brand/cadence_brand.html`)

| Nombre | Hex | Uso |
|---|---|---|
| Berenjena | `#241826` | Fondo de tema oscuro |
| Morado | `#6E2C8F` | Acento secundario |
| Magenta | `#C42BA6` | Color de marca principal, CTAs |
| Magenta claro | `#E24FCB` | Hover / variantes |
| Gallery | `#9A55C4` | Color de la palabra "gallery" en el logo |
| Tinta | `#1A1320` | Texto principal sobre fondo claro |

> ⚠️ `#C42BA6` sobre blanco ≈ 4.0:1 (AA al límite). Regla: texto blanco **sobre** magenta
> (pasa holgado); magenta como texto solo en tamaño grande/bold, o se oscurece un punto.

### Escala neutra (violeta-desaturada, derivada del CSS del brand kit — no inventada)

`50 #FAFAFA · 100 #F0EFF2 · 200 #E3E1E7 · 300 #C9C5D0 · 400 #9A92A6 · 500 #6A6276 ·
600 #4A4356 · 700 #332C3D · 800 #241826 (Berenjena) · 900 #1A1320 (Tinta)`

### Tokens semánticos (claro / oscuro)

| Token | Claro | Oscuro |
|---|---|---|
| `bg` | `#FAFAFA` | `#241826` |
| `surface` (cards) | `#FFFFFF` | un escalón sobre `bg` |
| `border` | `#ECECEC` | neutral-700 |
| `divider` | `#F0F0F0` | neutral-700 |
| `text` | `#1D1626` | neutral-100 |
| `text-muted` | `#6A6276` | neutral-300 |
| `text-subtle` | `#9A92A6` | neutral-400 |
| `accent` | `#C42BA6` (Magenta) | `#E24FCB` (Magenta claro) |

### Tipografía

- **Manrope** (Variable Font), self-hosted con `next/font/local` desde `src/fonts/`.
  Rango variable `200 800`; pesos en uso: 400 / 600 / 700 / 800. Fallback `system-ui, sans-serif`.
  `font-display: swap`.
- **Monospace**: stack del sistema (`ui-monospace, Menlo, Consolas, monospace`) para fechas,
  versiones y código. Sin familia extra.

### Tono visual

Limpio y aireado (mucho whitespace), técnico pero accesible ("instrumento profesional"),
animaciones sutiles, respeto a `prefers-reduced-motion`. Claro como default.

---

## 6. Decisiones técnicas tomadas (con justificación)

### i18n: next-intl con rutas siempre prefijadas (`localePrefix: 'always'`)
`/es/...` y `/en/...`; español por defecto. next-intl es la opción diseñada para App Router +
static export (`generateStaticParams` + `setRequestLocale`). `next-i18next` se descartó (orientado
a Pages Router / SSR, friccionaría con `output: 'export'`). Rutas simétricas → hreflang y switch de
idioma más simples y mejor SEO. `dynamicParams = false`.

### Redirect de la raíz `/` → `/es/` vía `public/index.html`
El **middleware de Next no corre en static export**, así que no hay negociación de idioma
server-side. Como no existe `app/page.tsx` (todas las rutas viven bajo `[locale]`), `/` lo
resuelve **`public/index.html`**: un redirect locale-aware (JS que respeta
`localStorage('locale')` > `navigator.language` > `es`) con `<meta http-equiv="refresh">`
como fallback sin JS (siempre a `/es/`). En el **export estático** (y en cualquier host estático
como Cloudflare) `/` sirve `index.html` y el redirect funciona, honrando la persistencia de
idioma. **Ojo en desarrollo**: `next dev` **no** sirve `public/index.html` en `/` (el App Router
se queda con `/` y no hay `app/page.tsx`), así que la raíz da **404 en dev** — en dev hay que
entrar directo a `/es/` o `/en/`. El redirect de raíz solo aplica al sitio buildeado. Se descartó
`_redirects` de Cloudflare porque su 302 server-side dispararía antes que el JS y rompería la
persistencia. No usar `redirects()` de `next.config` (no se aplica en export).

### ESLint 9 + flat config nativo de eslint-config-next
`eslint-config-next` 16 exporta **flat config nativo** (arrays `Linter.Config[]`) en
`eslint-config-next/core-web-vitals` y `/typescript`; se importan y se spreadean directo en
`eslint.config.mjs`. **No** usar `FlatCompat`/`@eslint/eslintrc` (rompe con estructura circular).
Se fija **ESLint 9** (no 10): los plugins bundleados por eslint-config-next 16 usan
`context.getFilename`, removido en ESLint 10 → crash. `next lint` fue removido en Next 16:
el script `lint` usa el CLI `eslint .`.

### `next/image` desactivado; `<img>` para assets de marca
En static export `images.unoptimized` ya está activo, así que `next/image` no optimiza nada.
Los SVG de marca se sirven con `<img>` (más simple, permite swap claro/oscuro por clase con
`dark:hidden`/`dark:block`). La regla `@next/next/no-img-element` se apaga en `eslint.config.mjs`.

### Lectura del tema en cliente con `useSyncExternalStore`
`ThemeToggle` lee la clase `dark` del `<html>` (puesta por el script anti-FOUC) mediante
`useSyncExternalStore` + `MutationObserver`, no con `useState`+`useEffect`. Evita el lint
`react-hooks/set-state-in-effect` y el mismatch de hidratación (usa `getServerSnapshot = false`).
El toggle muta la clase del DOM; el observer dispara el re-render.

### Componentes base sin librería externa (Fase 2)
Sin shadcn/Radix ni tailwind-merge: para los primitivos que necesitamos alcanza Tailwind +
`clsx` (helper `cn` en `src/lib/cn.ts`). Las variantes se resuelven con mapas `Record<Variant,
string>` (estilo CVA manual). Componentes en `src/components/ui/`: `Button`/`ButtonLink`
(variantes primary/secondary/ghost, tamaños sm/md/lg), `Card` (con `interactive`), `Section`
(header opcional eyebrow+título+descripción), `Eyebrow`, `Badge` (neutral/accent), `Prose`
(texto largo, estilos `.prose-cadence` en globals). Si más adelante hace falta accesibilidad
compleja (menús, dialogs), se reevalúa Radix puntualmente.

### Polimorfismo Button: dos componentes, no `as`
En vez de un Button polimórfico con tipos complejos, hay `Button` (renderiza `<button>`) y
`ButtonLink` (renderiza el `Link` de next-intl) compartiendo `buttonStyles()`. Más simple y
type-safe. La escala tipográfica se usa con utilidades Tailwind directas (documentada en globals.css
sobre `.prose-cadence`), sin componentes Heading/Text dedicados.

### Tailwind v4 (config CSS-first)
Sin `tailwind.config.ts`: el tema se define con `@theme` en `src/styles/globals.css` y el dark
mode con `@custom-variant dark (&:where(.dark, .dark *))` (estrategia de clase). Es la versión
estable actual, más rápida. Difiere de la estructura del brief (que asumía `tailwind.config.ts`).

### Tema claro/oscuro sin FOUC
Script bloqueante inline en `<head>` (antes del paint) que lee `localStorage` +
`prefers-color-scheme` y aplica la clase `dark` en `<html>`. Persistencia en `localStorage`,
respeto a `prefers-color-scheme` en primera visita. Toggle accesible (sol/luna) en el header.

### Imágenes en static export
`images: { unoptimized: true }`, `trailingSlash: true`. Sin optimización dinámica de `next/image`.
Screenshots pre-optimizadas a **WebP** a mano (con `sharp`, no hay ImageMagick/cwebp en el
entorno) y servidas con `width`/`height` explícitos + `loading="lazy"` para no romper CLS.
Logos/símbolos como SVG desde `/brand/`.

### Assets del brand kit y convención de rutas en `public/`
Se respeta la convención del `head-snippet.html` provisto: `favicon.ico` y `site.webmanifest`
en la raíz de `public/`, y el resto bajo `public/brand/` (`favicon.svg`, `icons/`, lockups,
marks). El `<meta name="theme-color">` se emite con `media="(prefers-color-scheme: …)"` (claro
y oscuro), no el `#241826` fijo del snippet.

### SEO en static export (metadata, sitemap, robots, JSON-LD)
Toda la metadata sale de un helper único (`buildPageMetadata` en `src/lib/metadata.ts`) que arma
title/description + `alternates` (canonical + hreflang es/en/x-default) + OpenGraph + Twitter. La
imagen OG se incluye **en cada página** (no solo en el layout) porque Next reemplaza el objeto
`openGraph` entero al sobrescribirlo, no hace merge profundo. `app/sitemap.ts` y `app/robots.ts`
(con `export const dynamic = 'force-static'`) generan `/sitemap.xml` y `/robots.txt` estáticos en el
export; el sitemap enumera segmentos × locales con `alternates.languages`. JSON-LD vía componente
`JsonLd` (script inline); `SoftwareApplication` sin `offers` porque las apps no están publicadas.
URLs siempre con trailing slash (coincide con `trailingSlash: true`).

### Guías: índice + página por guía (ruta dinámica estática)
Cada guía tiene su propia URL (`/[app]/guides/[slug]`) en vez de secciones con anclas en una sola
página: mejor para SEO y para compartir links, y escala al sumar guías. En static export, el
segmento `[slug]` enumera sus valores con `generateStaticParams` (los slugs de `src/lib/guides.ts`)
y `dynamicParams = false`; Next compone locale × slug. El contenido (estructurado en `sections[]`)
vive en namespaces JSON propios. Decidido con Iván en Fase 6.

### Screenshots
Metronome usa 3 capturas reales (`screen-light`, `screen-zen`, `screen-retro`; se descarta
`neon_dark_before_refactor.jpg`). Polypulse no tiene capturas → placeholders diseñados con
color de marca (componente `ScreenshotPlaceholder`), reemplazables cuando Iván provea las reales.

---

## 7. Estado actual

- **Fase activa**: **Fase 7 completada** ✅ (2026-06-13). Próximo: Fase 8 (Cloudflare Pages,
  dominio, deploy — **solo con autorización explícita de Iván**) o Fase 9 (pulido visual).
- **Completado**:
  - Descubrimiento (sección 11) y decisiones acordadas con Iván.
  - Fase 0: brand kit copiado a `public/` (favicon, manifest, `/brand/`), fuente a `src/fonts/`.
  - Fase 1: scaffold Next 16 + TS strict + Tailwind v4 + next-intl + tema sin FOUC; layout raíz,
    Header (logo, switch idioma, toggle tema), Footer, árbol de 7 rutas × 2 idiomas con
    placeholders, redirect de raíz.
  - Fase 2: sistema visual y componentes base — escala tipográfica, `Button`/`ButtonLink`, `Card`,
    `Section`, `Eyebrow`, `Badge`, `Prose` (+ `.prose-cadence`), helper `cn`. Validado visualmente
    en claro y oscuro (Edge headless). Página `/[locale]/styleguide` como dev aid (noindex).
  - Fase 3: Home completo — Hero, AppsSection (AppCard + ScreenshotPlaceholder), LatestSection
    (fechas con `useFormatter`), AboutSection (contacto `contacto@cadencegallery.com`). Namespace
    `home.json` ES/EN. Validado claro/oscuro.
  - Fase 4: páginas de detalle `/metronome` y `/polypulse` con contenido real (redactado por Claude,
    **sin** el paso de revisión previa — Iván decidió revisarlo desde el sitio). Componentes
    compartidos en `src/components/app/` (AppHero, FeatureGrid, ScreenshotGallery, Availability,
    GuidesCta, PhoneShot). Namespaces `metronome.json`/`polypulse.json` ES/EN. Screenshots de
    Metronome convertidas a WebP en `public/screenshots/` (sharp, devDep). Polypulse con placeholders
    (faltan capturas reales). Validado claro/oscuro.
  - Fase 5: políticas legales `/privacy` y `/terms` con contenido real (redactado por Claude,
    revisión desde el sitio como en Fase 4). Modelo de datos en JSON estructurado
    (`sections[]` con `heading` + `body[]` + `list?`), namespaces `privacy.json`/`terms.json`
    ES/EN registrados en `src/i18n/request.ts`. Componente compartido
    `src/components/legal/LegalDocument.tsx` (título + fecha de actualización en mono vía
    `getFormatter` + `Prose`/`.prose-cadence` + contacto `mailto`). `generateMetadata` por página
    (title/description desde `meta.*`). Permisos verificados contra los manifests reales: Metronome
    usa `FOREGROUND_SERVICE(_MEDIA_PLAYBACK)` + `UIBackgroundModes: audio` (solo seguir sonando
    en background), Polypulse sin permisos especiales; ninguna graba audio (audio solo de salida,
    sin micrófono ni red). Fecha de última actualización: 2026-06-13. Validado en claro (ES/EN);
    oscuro hereda tokens ya validados (sin colores nuevos).
  - Fase 6: guías iniciales (3 por app), contenido real redactado por Claude (revisión desde el
    sitio). Estructura **índice + página por guía**: `/[app]/guides` lista cards y cada guía vive
    en `/[app]/guides/[slug]` (ruta dinámica con `generateStaticParams` + `dynamicParams=false`,
    slugs/orden en `src/lib/guides.ts`). Namespaces `metronome-guides.json`/`polypulse-guides.json`
    (registrados como `metronomeGuides`/`polypulseGuides`); modelo por guía
    `{ title, summary, sections[] }` y cada sección `heading` + `body[]`/`list?`/`steps?` (steps =
    lista ordenada). Componentes en `src/components/guides/` (`GuidesIndex`, `GuideArticle` con
    breadcrumb app › guías + back-link, render vía `.prose-cadence`). `generateMetadata` por página.
    Temas — Metronome: tap-tempo, accents, subdivisions; Polypulse: polyrhythm-basics, coach-mode
    (las 4 rutinas reales del Coach, verificadas en `docs/coach_user_manual` de la app), mixer.
    Datos de features verificados contra el código (subdivisiones 2/3/4, acentos vía
    `customAccentedBeats`, BPM 20–300). Validado en claro ES/EN.
  - Fase 7: SEO + accesibilidad. Helper `src/lib/metadata.ts` (`buildPageMetadata`: title/description
    + `alternates` canonical/hreflang es/en/x-default + OpenGraph + Twitter `summary_large_image`),
    cableado en **todas** las páginas (claves `meta.title`/`meta.description` por namespace; home con
    título absoluto). JSON-LD (`src/lib/structured-data.ts` + componente `src/components/seo/JsonLd`):
    `SoftwareApplication` en `/metronome` y `/polypulse` (sin `offers`/precio — apps no publicadas),
    `Organization` + `WebSite` en el home. `app/sitemap.ts` (rutas × idiomas con `alternates.languages`,
    sin styleguide) y `app/robots.ts` (sitemap + disallow de styleguide) → `/sitemap.xml` y `/robots.txt`
    estáticos. Imagen OG de marca 1200×630 en `public/brand/og.png` (generada con `sharp`,
    `scripts/build-og.mjs`). A11y: skip-link, `lang`, `prefers-reduced-motion`, aria-labels en iconos
    ya estaban (fases 1-2); se corrigió el índice de guías para tener un `h1` único (antes el título
    salía como `h2` del `Section`). Verificado en el HTML generado (canonical/hreflang/OG/JSON-LD,
    sitemap/robots, 1 `h1` por página). Lint/TS/build limpios.
  - Capturas reales (2026-06-13): Iván reemplazó todas las capturas fuente en `design/screenshots/`
    (16 JPG 1080×2400). Script `scripts/build-screenshots.mjs` (sharp, 780px ancho, WebP q82) optimiza
    las 12 elegidas a `public/screenshots/`. **Metronome**: hero Neon (en marcha) + galería de los 7
    temas (Neon, Neon en marcha, Cyber, Chrome, Material You, Neon claro, Zen); título de sección pasó
    a "Un tema para cada momento" (sin número). **Polypulse**: adiós placeholders — hero 5:4:3 (tres
    voces), galería Reproductor (7:4)/Mixer/Coach/Sonidos por voz. **Home**: cards con capturas reales
    (`object-cover` encuadrado). `PhoneShot` ajustado a 780×1733 (proporción 9:20 real, evita CLS).
    4 capturas de Polypulse (`library`, `bpm_dialog`, `anchor_init`, `_create_dialog`) **descartadas**
    por un bug de mojibake (UTF-8 leído como Latin-1) en la **propia app** — reintegrarlas si Iván las
    corrige. Validado claro ES/EN; lint/build limpios.
- **Sigue**: Fase 8 (deploy, con autorización) o Fase 9 (pulido).
- **Pendientes diferidos**:
  - Quitar `src/app/[locale]/styleguide/` antes de producción (Fase 8). Ya está fuera del sitemap y
    con disallow en robots + `noindex` (Fase 7), pero conviene eliminar la ruta antes del deploy.
  - Iván puede ajustar el copy de apps y home (lo redactó Claude) cuando lo lea en el sitio.
  - Si Iván corrige el mojibake de Polypulse en la app, reintegrar la captura de Library (y otras) al sitio.

### Plan de fases

- **Fase 0**: Assets servibles — copiar brand kit a `public/`, fuente a `src/fonts/`, screenshots
  de Metronome a WebP (cuando se usen, Fase 4).
- **Fase 1**: Setup Next + TS + Tailwind v4 + next-intl + tema. Layout, header (switch idioma/tema),
  footer. Sin contenido.
- **Fase 2**: Tipografía + paleta en Tailwind. Componentes base (Button, Card, Container, Section).
- **Fase 3**: Home (hero, apps, latest, contacto). Contenido placeholder ES/EN.
- **Fase 4**: Páginas de detalle de apps + extracción de contenido real desde las carpetas de las
  apps (a revisión humana antes de incorporar). Screenshots a WebP.
- **Fase 5**: Políticas legales (privacy y terms), drafts ES/EN.
- **Fase 6**: Guías iniciales (2-3 por app).
- **Fase 7**: SEO (meta, sitemap, robots, hreflang, JSON-LD), accesibilidad.
- **Fase 8**: Cloudflare Pages, dominio, deploy (solo con autorización explícita de Iván).
- **Fase 9**: Pulido visual, animaciones sutiles, micro-interacciones.

> Contenido de copy de apps (Fase 4) y drafts legales (Fase 5) se presentan a Iván para revisión
> antes de incorporarlos. Producción solo con autorización explícita.

---

## 8. Cómo correr el proyecto

> Disponible a partir de la Fase 1 (cuando exista `package.json`).

```bash
npm install            # instalar dependencias
npm run dev            # servidor de desarrollo (next dev)
npm run build          # build estático → genera /out
npm run lint           # ESLint
npx serve out          # preview local del export estático
```

Deploy: Cloudflare Pages toma el build de `/out` desde el repo de GitHub. No publicar a
producción sin autorización explícita de Iván (los entornos preview de Cloudflare sí se pueden usar).

---

## 9. Reglas de trabajo (de `docs/PROJECT_BRIEF.md` §13)

- Ante ambigüedad de requisitos, **preguntar antes de asumir**.
- Antes de cada fase, armar TODOs con TodoWrite y **esperar confirmación** antes de codear.
- Commits atómicos con conventional commits al final de cada TODO significativo.
- Verificar APIs/versiones contra documentación actual, no de memoria.
- Validar visualmente tras cada cambio significativo.
- No publicar a producción hasta autorización explícita.
- Mantener el repo limpio: sin warnings de lint, sin errores de TS, sin `console.log`.
