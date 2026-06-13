import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GuideArticle, type GuideSection } from '@/components/guides/GuideArticle';
import { isGuideSlug, polypulseGuideSlugs } from '@/lib/guides';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return polypulseGuideSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'polypulseGuides' });
  return {
    title: t(`guides.${slug}.title`),
    description: t(`guides.${slug}.summary`),
  };
}

export default async function PolypulseGuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isGuideSlug(polypulseGuideSlugs, slug)) {
    notFound();
  }

  const t = await getTranslations('polypulseGuides');
  const tc = await getTranslations('common');

  return (
    <GuideArticle
      appName="Cadence Polypulse"
      appHref="/polypulse"
      guidesHref="/polypulse/guides"
      guidesLabel={tc('nav.guides')}
      backToGuides={t('backToGuides')}
      title={t(`guides.${slug}.title`)}
      summary={t(`guides.${slug}.summary`)}
      sections={t.raw(`guides.${slug}.sections`) as GuideSection[]}
    />
  );
}
