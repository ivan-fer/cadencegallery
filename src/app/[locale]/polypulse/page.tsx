import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

type Props = { params: Promise<{ locale: string }> };

export default async function PolypulsePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  return <PagePlaceholder title={t('nav.polypulse')} />;
}
