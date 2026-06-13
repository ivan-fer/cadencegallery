import { Hand, History, ListMusic, Music, Music2, Palette, ShieldCheck, Zap } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AppHero } from '@/components/app/AppHero';
import { Availability } from '@/components/app/Availability';
import { type Feature, FeatureGrid } from '@/components/app/FeatureGrid';
import { GuidesCta } from '@/components/app/GuidesCta';
import { PhoneShot } from '@/components/app/PhoneShot';
import { ScreenshotGallery, ScreenshotItem } from '@/components/app/ScreenshotGallery';
import { Section } from '@/components/ui/Section';

type Props = { params: Promise<{ locale: string }> };

const FEATURE_ICONS = {
  lowLatency: Zap,
  tapTempo: Hand,
  timeSignatures: Music,
  sequencer: ListMusic,
  themes: Palette,
  sounds: Music2,
  history: History,
  privacy: ShieldCheck,
} as const;

export default async function MetronomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('metronome');

  const features: Feature[] = (Object.keys(FEATURE_ICONS) as (keyof typeof FEATURE_ICONS)[]).map(
    (key) => ({
      icon: FEATURE_ICONS[key],
      title: t(`features.${key}.title`),
      description: t(`features.${key}.description`),
    }),
  );
  const paragraphs = t.raw('description.paragraphs') as string[];

  return (
    <>
      <AppHero
        eyebrow={t('hero.eyebrow')}
        name="Cadence Metronome"
        tagline={t('hero.tagline')}
        availabilityLabel={t('availability.badge')}
        guidesHref="/metronome/guides"
        guidesLabel={t('hero.guidesCta')}
        media={
          <PhoneShot src="/screenshots/metronome-light.webp" alt="Cadence Metronome" priority />
        }
      />

      <Section eyebrow={t('description.eyebrow')} title={t('description.title')}>
        <div className="max-w-2xl space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed text-text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={t('features.eyebrow')}
        title={t('features.title')}
        className="border-t border-border"
      >
        <FeatureGrid items={features} />
      </Section>

      <Section
        eyebrow={t('screenshots.eyebrow')}
        title={t('screenshots.title')}
        className="border-t border-border"
      >
        <ScreenshotGallery>
          <ScreenshotItem caption={t('screenshots.light')}>
            <PhoneShot src="/screenshots/metronome-light.webp" alt={t('screenshots.light')} />
          </ScreenshotItem>
          <ScreenshotItem caption={t('screenshots.zen')}>
            <PhoneShot src="/screenshots/metronome-zen.webp" alt={t('screenshots.zen')} />
          </ScreenshotItem>
          <ScreenshotItem caption={t('screenshots.retro')}>
            <PhoneShot src="/screenshots/metronome-retro.webp" alt={t('screenshots.retro')} />
          </ScreenshotItem>
        </ScreenshotGallery>
      </Section>

      <Availability
        title={t('availability.title')}
        note={t('availability.note')}
        appStore={t('availability.appStore')}
        googlePlay={t('availability.googlePlay')}
      />

      <GuidesCta
        title={t('guides.title')}
        description={t('guides.description')}
        href="/metronome/guides"
        cta={t('guides.cta')}
      />
    </>
  );
}
