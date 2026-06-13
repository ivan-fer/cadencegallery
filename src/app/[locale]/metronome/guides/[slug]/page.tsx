import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GuideArticle, type GuideSection } from '@/components/guides/GuideArticle';
import { isGuideSlug, metronomeGuideSlugs } from '@/lib/guides';
import { buildPageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return metronomeGuideSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'metronomeGuides' });
  return buildPageMetadata({
    locale,
    segment: `metronome/guides/${slug}`,
    title: t(`guides.${slug}.title`),
    description: t(`guides.${slug}.summary`),
  });
}

export default async function MetronomeGuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isGuideSlug(metronomeGuideSlugs, slug)) {
    notFound();
  }

  const t = await getTranslations('metronomeGuides');
  const tc = await getTranslations('common');

  return (
    <GuideArticle
      appName="Cadence Metronome"
      appHref="/metronome"
      guidesHref="/metronome/guides"
      guidesLabel={tc('nav.guides')}
      backToGuides={t('backToGuides')}
      title={t(`guides.${slug}.title`)}
      summary={t(`guides.${slug}.summary`)}
      sections={t.raw(`guides.${slug}.sections`) as GuideSection[]}
    />
  );
}
