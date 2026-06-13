import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { AppCard } from './AppCard';

export function AppsSection() {
  const t = useTranslations('home.apps');

  return (
    <Section
      id="apps"
      eyebrow={t('eyebrow')}
      title={t('title')}
      description={t('description')}
      className="border-t border-border"
      reveal
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <AppCard
          href="/metronome"
          name={t('metronome.name')}
          tagline={t('metronome.tagline')}
          cta={t('metronome.cta')}
          imageSrc="/screenshots/metronome-neon-playing.webp"
          imagePosition="object-[center_36%]"
        />
        <AppCard
          href="/polypulse"
          name={t('polypulse.name')}
          tagline={t('polypulse.tagline')}
          cta={t('polypulse.cta')}
          imageSrc="/screenshots/polypulse-poly.webp"
          imagePosition="object-[center_34%]"
        />
      </div>
    </Section>
  );
}
