import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutSection } from '@/components/home/AboutSection';
import { AppsSection } from '@/components/home/AppsSection';
import { Hero } from '@/components/home/Hero';
import { LatestSection } from '@/components/home/LatestSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/metadata';
import { organizationLd, webSiteLd } from '@/lib/structured-data';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return buildPageMetadata({
    locale,
    segment: '',
    title: t('meta.title'),
    description: t('meta.description'),
    titleAbsolute: true,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={[organizationLd(locale), webSiteLd(locale)]} />
      <Hero />
      <AppsSection />
      <LatestSection />
      <AboutSection />
    </>
  );
}
