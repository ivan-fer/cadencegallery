import { setRequestLocale } from 'next-intl/server';
import { AboutSection } from '@/components/home/AboutSection';
import { AppsSection } from '@/components/home/AppsSection';
import { Hero } from '@/components/home/Hero';
import { LatestSection } from '@/components/home/LatestSection';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AppsSection />
      <LatestSection />
      <AboutSection />
    </>
  );
}
