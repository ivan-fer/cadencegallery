import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GuidesIndex, type GuideSummary } from '@/components/guides/GuidesIndex';
import { polypulseGuideSlugs } from '@/lib/guides';
import { buildPageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'polypulseGuides' });
  return buildPageMetadata({
    locale,
    segment: 'polypulse/guides',
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

export default async function PolypulseGuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('polypulseGuides');

  const guides: GuideSummary[] = polypulseGuideSlugs.map((slug) => ({
    slug,
    title: t(`guides.${slug}.title`),
    summary: t(`guides.${slug}.summary`),
  }));

  return (
    <GuidesIndex
      eyebrow={t('index.eyebrow')}
      title={t('index.title')}
      description={t('index.description')}
      readMore={t('index.readMore')}
      basePath="/polypulse/guides"
      guides={guides}
    />
  );
}
