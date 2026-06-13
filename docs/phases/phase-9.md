# Fase 9 — Pulido visual: animaciones sutiles + micro-interacciones

> Última fase del plan. Intensidad acordada con Iván: **"notoria pero elegante"**;
> scroll-reveal **en secciones clave** (no en todo). Todo respeta `prefers-reduced-motion`
> y degrada con elegancia sin JavaScript.

---

## 1. Tokens de movimiento (`src/styles/globals.css`)

- `@theme` con dos curvas de easing → utilidades Tailwind `ease-cadence` / `ease-cadence-out`:
  - `--ease-cadence: cubic-bezier(0.22, 1, 0.36, 1)` — salida con leve overshoot, para
    **entradas y hovers**.
  - `--ease-cadence-out: cubic-bezier(0.33, 1, 0.68, 1)` — salida estándar, para
    **transiciones de color/estado**.
- Keyframe `cadence-fade-up` + utilidad `.animate-fade-up` (fill `both`) para entradas en carga.
- Reglas `.reveal` / `.phoneshot-fade` (ver abajo).
- `prefers-reduced-motion`: además de neutralizar `animation-duration`/`transition-duration`,
  ahora también `animation-delay` (para el stagger del hero) y fuerza `.reveal`/`.phoneshot-fade`
  a visibles.

## 2. Scroll-reveal robusto

- **Componente** `src/components/ui/Reveal.tsx` (client): `IntersectionObserver` one-shot
  (se desconecta al revelar), fade-up de 28px, prop `delay` para escalonar, `as` polimórfico.
- **Clave de robustez**: el estado oculto vive en CSS y **solo aplica bajo la clase `.js`** que
  el script inline anti-FOUC añade a `<html>` antes del paint (`src/app/[locale]/layout.tsx`).
  Sin JS → sin `.js` → contenido siempre visible. Sin riesgo de contenido "fantasma".
- **Cableado**: `Section` ganó un prop opt-in `reveal` que envuelve header y cuerpo en `Reveal`
  con stagger (cuerpo +90ms). Activado en:
  - Home: `AppsSection`, `LatestSection`, `AboutSection`.
  - Apps (`/metronome`, `/polypulse`): secciones de **descripción**, **features** y **capturas**.

## 3. Entrada del hero (home)

- `Hero` anima al cargar con `.animate-fade-up` + `animation-delay` escalonado
  (marca 0 · título 80ms · tagline 160ms · CTAs 240ms). Corre en **CSS puro** (no depende de JS)
  por estar above-the-fold; termina visible y reduced-motion lo neutraliza.

## 4. Micro-interacciones

- **Botones** (`ui/Button.tsx`): feedback de pulsación `active:scale-[0.97]` + `transition`
  con `ease-cadence-out`.
- **ThemeToggle**: crossfade + rotación sol/luna (ambos iconos montados, `transition-all` con
  `ease-cadence`), en vez del swap seco.
- **Galería de capturas** (`app/ScreenshotGallery.tsx`): lift sutil al hover
  (`group-hover:-translate-y-1.5`).
- **`PhoneShot`** (ahora client): **fade-in al decodificar** la imagen (`.phoneshot-fade`,
  anti pop-in) salvo la captura `priority` del hero (LCP, sin retardo). Cubre el caso de imagen
  cacheada vía `img.complete` en `useEffect`.
- **Header** (ahora client): sombra + borde sutiles que aparecen al hacer scroll (`scrollY > 8`),
  con `transition-shadow`. En el top queda sin borde (más limpio).

## 5. Validación

- `npm run lint` ✅ · `npx tsc --noEmit` ✅ · `npm run build` ✅ (30 páginas).
- El `setState` síncrono del fallback sin `IntersectionObserver` se difiere con
  `requestAnimationFrame` para no disparar `react-hooks/set-state-in-effect`.
- Captura headless (Edge `--virtual-time-budget`) de `/es/` y `/es/metronome/` en **claro**:
  contenido revelado correctamente, hero y galería visibles, layout intacto.
- **Oscuro**: Edge headless no emula `prefers-color-scheme` de forma fiable; todos los cambios de
  Fase 9 son sobre **tokens semánticos / opacidad / transform** (sin colores nuevos), por lo que
  hereda los tokens de oscuro ya validados en fases previas.

## 6. Notas

- Nada de librerías de animación: solo CSS + un `IntersectionObserver`. Coherente con el peso
  ligero del sitio estático.
- Si en el futuro se quiere reveal en páginas largas (legales/guías), basta con pasar `reveal`
  a esos `Section` o envolver bloques en `<Reveal>`.
