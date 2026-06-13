import type { MetadataRoute } from 'next';
import { metronomeGuideSlugs, polypulseGuideSlugs } from '@/lib/guides';
import { localizedUrl } from '@/lib/metadata';
import { routing } from '@/i18n/routing';

/**
 * Todas las rutas públicas (sin prefijo de idioma). Cada segmento genera una
 * entrada por locale con sus `alternates.languages` (hreflang) para el
 * indexado multilingüe.
 */
const segments: readonly string[] = [
  '',
  'metronome',
  'metronome/guides',
  ...metronomeGuideSlugs.map((slug) => `metronome/guides/${slug}`),
  'polypulse',
  'polypulse/guides',
  ...polypulseGuideSlugs.map((slug) => `polypulse/guides/${slug}`),
  'privacy',
  'terms',
];

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return segments.flatMap((segment) => {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = localizedUrl(locale, segment);
    }
    languages['x-default'] = localizedUrl(routing.defaultLocale, segment);

    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, segment),
      alternates: { languages },
    }));
  });
}
