import localFont from 'next/font/local';

/**
 * Manrope (Variable Font), self-hosted con next/font/local.
 * Rango variable 200–800; pesos en uso: 400 / 600 / 700 / 800.
 * Se expone como CSS var `--font-manrope`, consumida por Tailwind (`--font-sans`).
 */
export const manrope = localFont({
  src: '../fonts/Manrope-VariableFont_wght.ttf',
  variable: '--font-manrope',
  weight: '200 800',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
