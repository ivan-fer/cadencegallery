import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://cadencegallery.com';
export const SITE_NAME = 'Cadence Gallery';
export const OG_IMAGE = '/brand/og.png';

/** Locale del sitio → locale de Open Graph (formato `xx_XX`). */
const OG_LOCALE: Record<string, string> = {
  es: 'es_ES',
  en: 'en_US',
};

/**
 * URL absoluta de un segmento para un locale, con trailing slash (coincide con
 * `trailingSlash: true`). `segment` no lleva prefijo de idioma: '' = home,
 * 'metronome', 'metronome/guides/tap-tempo', etc.
 */
export function localizedUrl(locale: string, segment: string): string {
  const path = segment ? `${segment}/` : '';
  return `${SITE_URL}/${locale}/${path}`;
}

/** `alternates` con canonical de la página + hreflang (es/en/x-default → es). */
export function buildAlternates(locale: string, segment: string): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localizedUrl(l, segment);
  }
  languages['x-default'] = localizedUrl(routing.defaultLocale, segment);

  return {
    canonical: localizedUrl(locale, segment),
    languages,
  };
}

type BuildPageMetadataArgs = {
  locale: string;
  /** Segmento sin prefijo de idioma. '' para el home. */
  segment: string;
  title: string;
  description: string;
  /** Para el home: usa el título tal cual, sin el template `%s · Cadence Gallery`. */
  titleAbsolute?: boolean;
};

/**
 * Metadata común por página: title/description + alternates (canonical + hreflang),
 * Open Graph y Twitter Card con la imagen de marca. La imagen va en cada página
 * (no se hereda del layout: Next reemplaza `openGraph` entero al sobrescribirlo).
 */
export function buildPageMetadata({
  locale,
  segment,
  title,
  description,
  titleAbsolute,
}: BuildPageMetadataArgs): Metadata {
  const url = localizedUrl(locale, segment);

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: buildAlternates(locale, segment),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? locale,
      url,
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
