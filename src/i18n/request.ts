import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/**
 * Carga la configuración de i18n por request (en static export: por ruta estática).
 * Los mensajes se organizan por namespace (un archivo JSON por sección).
 * A medida que avancen las fases se agregan namespaces (home, metronome, …).
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const common = (await import(`../../messages/${locale}/common.json`)).default;

  return {
    locale,
    messages: {
      common,
    },
  };
});
