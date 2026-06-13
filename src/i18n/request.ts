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

  const [common, home, metronome, polypulse, privacy, terms] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/home.json`),
    import(`../../messages/${locale}/metronome.json`),
    import(`../../messages/${locale}/polypulse.json`),
    import(`../../messages/${locale}/privacy.json`),
    import(`../../messages/${locale}/terms.json`),
  ]);

  return {
    locale,
    messages: {
      common: common.default,
      home: home.default,
      metronome: metronome.default,
      polypulse: polypulse.default,
      privacy: privacy.default,
      terms: terms.default,
    },
  };
});
