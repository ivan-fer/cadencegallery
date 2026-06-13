import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // Todas las rutas llevan prefijo de idioma (/es/..., /en/...).
  // La raíz `/` se resuelve por separado (public/index.html), porque el
  // middleware de next-intl no corre en static export.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
