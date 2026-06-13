import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GuidesIndex, type GuideSummary } from '@/components/guides/GuidesIndex';
import { metronomeGuideSlugs } from '@/lib/guides';
import { buildPageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metronomeGuides' });
  return buildPageMetadata({
    locale,
    segment: 'metronome/guides',
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

export default async function MetronomeGuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('metronomeGuides');

  const guides: GuideSummary[] = metronomeGuideSlugs.map((slug) => ({
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
      basePath="/metronome/guides"
      guides={guides}
    />
  );
}
