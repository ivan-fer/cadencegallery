# Fase 1 — Setup base del proyecto

**Fecha:** 2026-06-13
**Estado:** Completada ✅

## Objetivo

Dejar el proyecto Next.js levantado con TypeScript, Tailwind v4, internacionalización
(next-intl) y sistema de tema claro/oscuro. Layout principal con header (switch de idioma y
tema) y footer. Sin contenido real todavía: páginas placeholder.

## Qué se hizo

### Fase 0 (assets servibles, previa)
- Copia del brand kit a `public/` respetando la convención del `head-snippet.html`:
  `favicon.ico` y `site.webmanifest` en la raíz; `favicon.svg`, lockups, marks e `icons/` bajo
  `public/brand/`.
- Fuente `Manrope-VariableFont_wght.ttf` copiada a `src/fonts/` para `next/font/local`.

### Configuración
- `package.json` — Next 16.2.9, React 19.2.7, next-intl 4.13, Tailwind v4.3.1, lucide-react,
  clsx; dev deps ESLint 9 + eslint-config-next + Prettier + plugin tailwind.
- `next.config.mjs` — `output: 'export'`, `trailingSlash: true`, `images.unoptimized`, envuelto
  con el plugin de next-intl.
- `tsconfig.json` — strict, alias `@/*` → `src/*`. (Next reconfiguró `jsx: react-jsx` y agregó
  `.next/dev/types` al build.)
- `eslint.config.mjs` — flat config nativo de eslint-config-next (core-web-vitals + typescript);
  `no-img-element` apagado.
- `postcss.config.mjs` — `@tailwindcss/postcss`. `.prettierrc.json`, `.gitignore`.

### Estilos y fuente
- `src/styles/globals.css` — `@import 'tailwindcss'`, `@custom-variant dark` (estrategia clase),
  tokens semánticos claro/oscuro como variables CSS + `@theme inline`, escala neutra y colores de
  marca, `prefers-reduced-motion`, foco accesible.
- `src/lib/fonts.ts` — Manrope variable (200–800), `display: swap`, var `--font-manrope`.

### i18n (next-intl)
- `src/i18n/routing.ts` — locales `['es','en']`, default `es`, `localePrefix: 'always'`.
- `src/i18n/navigation.ts` — `Link`, `usePathname`, etc. conscientes del locale.
- `src/i18n/request.ts` — carga `messages/<locale>/common.json` (namespace `common`).
- `messages/{es,en}/common.json` — textos de nav, header, theme, locale, footer, placeholder.

### Layout y componentes
- `src/app/[locale]/layout.tsx` — `<html lang>`, script inline anti-FOUC, `generateStaticParams`,
  `dynamicParams = false`, `setRequestLocale`, metadata (icons + manifest) y `viewport.themeColor`
  con `prefers-color-scheme`, `NextIntlClientProvider`, Header/main/Footer, skip-link target.
- `components/layout/Header.tsx` — logo lockup (swap claro/oscuro), nav, `LocaleSwitch`, `ThemeToggle`,
  skip-link.
- `components/layout/Footer.tsx` — mark, tagline, columnas Apps/Legal, copyright (mono).
- `components/layout/ThemeToggle.tsx` — `useSyncExternalStore` + `MutationObserver` (client).
- `components/layout/LocaleSwitch.tsx` — toggle ES/EN preservando la página equivalente (client).
- `components/ui/Container.tsx`, `components/ui/PagePlaceholder.tsx`.

### Rutas (placeholders)
`[locale]/`: home, `metronome`, `metronome/guides`, `polypulse`, `polypulse/guides`, `privacy`,
`terms` → 7 rutas × 2 idiomas.

### Redirect de la raíz
`public/index.html` — redirect locale-aware (JS: localStorage > navigator.language > es) con
`<meta refresh>` de fallback. Funciona en dev y en hosting estático.

## Incidencias resueltas

- **ESLint 10 incompatible** con los plugins de eslint-config-next 16 (`context.getFilename`
  removido) → se fijó **ESLint 9.39.4**.
- **FlatCompat rompía** (estructura circular) → se usa el **flat config nativo** que exporta
  eslint-config-next 16.
- **`next lint` removido en Next 16** → script `lint` = `eslint .`.
- **`react-hooks/set-state-in-effect`** en ThemeToggle → reescrito con `useSyncExternalStore`.

## Verificación

- `npx tsc --noEmit` → OK.
- `npm run lint` → sin errores ni warnings.
- `npm run build` → 16 páginas estáticas generadas en `out/`.
- `npm run dev` → `/es/` (nav en español), `/en/metronome/` (`lang="en"`, "Under construction"),
  `/en/polypulse/` → todos 200.

## Pendiente para fases siguientes

- Fase 2: componentes base (Button, Card, Section) y consolidación del sistema visual.
- Diferido: screenshots a WebP (Fase 4); capturas reales de Polypulse (las provee Iván).
