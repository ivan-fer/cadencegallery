import type { Metadata } from 'next';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalDocument, type LegalSection } from '@/components/legal/LegalDocument';
import { buildPageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return buildPageMetadata({
    locale,
    segment: 'privacy',
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');
  const format = await getFormatter();

  const updatedDate = t('lastUpdated');

  return (
    <LegalDocument
      title={t('title')}
      updatedLabel={t('updatedLabel')}
      updatedDate={updatedDate}
      formattedDate={format.dateTime(new Date(updatedDate), {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })}
      intro={t('intro')}
      sections={t.raw('sections') as LegalSection[]}
      contactHeading={t('contactHeading')}
      contactBody={t('contactBody')}
      email={t('email')}
    />
  );
}
