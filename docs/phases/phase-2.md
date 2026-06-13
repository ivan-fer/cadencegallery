# Fase 2 — Sistema visual y componentes base

**Fecha:** 2026-06-13
**Estado:** Completada ✅

## Objetivo

Consolidar el sistema de diseño (la paleta y la tipografía ya quedaron cableadas en `globals.css`
en Fase 1) y construir los componentes base reutilizables por todas las páginas.

## Qué se hizo

### Tipografía
- Escala documentada en `globals.css` (eyebrow / h1-h3 / lead / body / caption / mono) usando
  utilidades Tailwind directas sobre Manrope. Sin componentes Heading/Text dedicados.

### Componentes (`src/components/ui/`)
- `cn` (`src/lib/cn.ts`) — wrapper fino sobre clsx.
- `Button` + `ButtonLink` — variantes `primary` (magenta, texto blanco) / `secondary` / `ghost`;
  tamaños `sm`/`md`/`lg`; `buttonStyles()` compartido. Dos componentes en vez de polimorfismo `as`.
- `Card` — superficie con borde/radio/padding; prop `interactive` (hover lift + sombra).
- `Section` — ritmo vertical (`py-16 sm:py-24`) + header opcional (eyebrow + título + descripción)
  dentro de `Container`.
- `Eyebrow` — etiqueta mono/uppercase con acento.
- `Badge` — pastilla `neutral`/`accent` (para "Próximamente").
- `Prose` — texto largo (legales/guías); estilos `.prose-cadence` en `globals.css` (@layer components).
- `PagePlaceholder` migrado a `Badge` + escala tipográfica.

### Validación visual
- Página `/[locale]/styleguide` (dev aid, `robots: noindex`) mostrando todos los componentes.
- Capturas con Edge headless en **claro** y **oscuro** (`--blink-settings=preferredColorScheme`):
  Manrope OK, acentos magenta (claro `#C42BA6` / oscuro `#E24FCB`), swap de logo y tokens correcto,
  contraste y jerarquía consistentes.

## Decisiones

- **Sin librería de componentes** (shadcn/Radix) ni tailwind-merge: Tailwind + clsx + mapas de
  variantes alcanza y mantiene el bundle liviano. Reevaluar Radix solo si surge a11y compleja.
- **Styleguide** queda como ayuda de desarrollo; se remueve antes de producción (Fase 8) y se
  excluye del sitemap (Fase 7). `robots: noindex` la protege mientras tanto.

## Verificación

- `npx tsc --noEmit` → OK.
- `npm run lint` → sin errores ni warnings (tras corregir un `<a>` interno en el demo de Prose).
- `npm run build` → 18 páginas estáticas (se sumó styleguide × 2 idiomas).
- Validación visual claro/oscuro vía screenshots.

## Pendiente para fases siguientes

- Fase 3: Home (hero, sección de apps con `Card interactive`, latest, contacto) con contenido
  placeholder en ES/EN.
