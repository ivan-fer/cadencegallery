# Fase 3 — Home

**Fecha:** 2026-06-13
**Estado:** Completada ✅

## Objetivo

Construir el Home con sus secciones (hero, apps, latest, about/contacto) y contenido placeholder
en español e inglés. El copy de las apps es provisional; se refina en Fase 4 con revisión de Iván.

## Qué se hizo

### Traducciones
- `messages/{es,en}/home.json` — namespaces `hero`, `apps`, `latest`, `about`.
- `src/i18n/request.ts` carga ahora `common` + `home` en paralelo.

### Componentes
- `components/ui/ScreenshotPlaceholder.tsx` — caja diseñada con tinte de marca + ícono + label +
  caption ("Captura próximamente"). Reutilizable en Fase 4 para las galerías de capturas.
- `components/home/Hero.tsx` — símbolo de marca (`mark_color.svg`), wordmark "Cadence Gallery"
  ("Gallery" en color `gallery`), tagline, CTAs a ambas apps, glow radial sutil (color-mix).
- `components/home/AppCard.tsx` — card interactiva clickeable (Link de next-intl) con placeholder,
  nombre, tagline y CTA con flecha animada en hover.
- `components/home/AppsSection.tsx` — `Section` con header + grid de 2 AppCards.
- `components/home/LatestSection.tsx` — lista de novedades; fecha formateada con `useFormatter`
  (`timeZone: 'UTC'` para evitar corrimiento de día), `t.raw('items')` para el array.
- `components/home/AboutSection.tsx` — párrafo + CTA `mailto:` con estilo de botón secundario.
- `src/app/[locale]/page.tsx` — ensambla las cuatro secciones (reemplaza el PagePlaceholder).

### Contenido (placeholder)
- Hero tagline, descripción de la sección de apps, taglines provisionales de Metronome y Polypulse
  (basadas en lo leído de sus repos, a refinar en Fase 4), 3 entradas de Latest con fecha, y texto
  de About con email de contacto `contacto@cadencegallery.com`.

## Decisiones

- **Email de contacto**: `contacto@cadencegallery.com` (acordado con Iván). Se reutilizará en
  Privacy/Terms (Fase 5).
- **Latest**: 3 entradas de ejemplo con fecha (acordado), claramente provisionales.
- **AppCard** no usa el componente `Card` con `as` (evita problemas de tipos con el Link); replica
  las clases de card interactiva sobre un `<Link>`.

## Verificación

- `npx tsc --noEmit` → OK · `npm run lint` → limpio · `npm run build` → 18 páginas.
- Screenshots Edge headless: Home en **claro (ES)** y **oscuro (EN)** — hero, cards de apps con
  placeholders, lista de novedades con fechas localizadas, contacto. Tokens y traducciones OK.

## Pendiente para fases siguientes

- Fase 4: páginas de detalle de apps con contenido real extraído de los repos (a revisión de Iván);
  refinar las taglines provisionales del home; capturas reales a WebP.
