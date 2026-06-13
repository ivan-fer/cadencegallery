/**
 * Slugs de guías por app, en el orden en que se listan en el índice.
 * Son la fuente para `generateStaticParams` (rutas `[slug]`) y para la lista
 * del índice; cada slug debe existir como clave en el namespace correspondiente
 * (`metronomeGuides` / `polypulseGuides`).
 */
export const metronomeGuideSlugs = ['tap-tempo', 'accents', 'subdivisions'] as const;
export const polypulseGuideSlugs = ['polyrhythm-basics', 'coach-mode', 'mixer'] as const;

export type MetronomeGuideSlug = (typeof metronomeGuideSlugs)[number];
export type PolypulseGuideSlug = (typeof polypulseGuideSlugs)[number];

/** Comprueba si un string es un slug válido de la lista dada. */
export function isGuideSlug(slugs: readonly string[], slug: string): boolean {
  return slugs.includes(slug);
}
