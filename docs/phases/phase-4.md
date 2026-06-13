# Fase 4 — Páginas de detalle de apps

**Fecha:** 2026-06-13
**Estado:** Completada ✅

## Objetivo

Construir las páginas de detalle de Cadence Metronome y Cadence Polypulse con contenido real
extraído de los repos de las apps.

> **Nota de proceso:** el brief (§7.1) preveía presentar el copy a Iván antes de incorporarlo.
> Iván decidió **saltar ese paso** y revisarlo directamente desde el sitio. El copy lo redactó
> Claude (ES + EN) a partir de los README/CLAUDE.md/docs de cada app; es ajustable.

## Qué se hizo

### Assets
- Screenshots reales de Metronome convertidas a **WebP** con `sharp` (devDependency):
  `public/screenshots/metronome-{light,zen,retro}.webp` (780×1768, ~20 KB c/u).
- Polypulse no tiene capturas → se usan `ScreenshotPlaceholder` en aspecto phone.

### Componentes compartidos (`src/components/app/`)
- `AppHero` — eyebrow, nombre, tagline, badge de disponibilidad, CTA a guías, media (captura o placeholder).
- `FeatureGrid` (+ tipo `Feature`) — grid de features con ícono lucide (el ícono se mapea en la página).
- `ScreenshotGallery` + `ScreenshotItem` — galería de capturas con leyenda.
- `PhoneShot` — `<img>` de captura móvil portrait con marco sutil (780×1768, lazy salvo `priority`).
- `Availability` — bloque "Próximamente en App Store y Google Play" sin links (apps no publicadas).
- `GuidesCta` — banda con CTA a las guías de la app.

### Contenido (ES/EN)
- `messages/{es,en}/metronome.json` y `polypulse.json`: hero, descripción (párrafos), 8 features,
  capturas, disponibilidad (con `badge` corto para el hero) y CTA de guías.
- `src/i18n/request.ts` ahora carga `common` + `home` + `metronome` + `polypulse`.

### Páginas
- `src/app/[locale]/metronome/page.tsx` — features con íconos (Zap, Hand, Music, ListMusic, Palette,
  Music2, History, ShieldCheck); galería con las 3 capturas WebP reales.
- `src/app/[locale]/polypulse/page.tsx` — features (Layers, LayoutGrid, Target, SlidersHorizontal,
  GraduationCap, LineChart, Zap, ShieldCheck); galería de 3 placeholders (Player/Mixer/Coach).

## Verificación

- `npx tsc --noEmit` → OK · `npm run lint` → limpio · `npm run build` → 18 páginas.
- Screenshots Edge headless: `/metronome` claro (ES) con captura real del dial; `/polypulse`
  oscuro (EN) con placeholders. Features, disponibilidad y CTAs OK en ambos temas.

## Pendiente para fases siguientes

- Fase 5: políticas legales (privacy y terms), drafts ES/EN, usando el componente `Prose`.
- Reemplazar placeholders de Polypulse con capturas reales cuando Iván las provea.
- Ajuste fino de copy (apps + home) tras la lectura de Iván.
