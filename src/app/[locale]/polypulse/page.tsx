import {
  GraduationCap,
  Layers,
  LayoutGrid,
  LineChart,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AppHero } from '@/components/app/AppHero';
import { Availability } from '@/components/app/Availability';
import { type Feature, FeatureGrid } from '@/components/app/FeatureGrid';
import { GuidesCta } from '@/components/app/GuidesCta';
import { ScreenshotGallery, ScreenshotItem } from '@/components/app/ScreenshotGallery';
import { JsonLd } from '@/components/seo/JsonLd';
import { ScreenshotPlaceholder } from '@/components/ui/ScreenshotPlaceholder';
import { Section } from '@/components/ui/Section';
import { buildPageMetadata } from '@/lib/metadata';
import { softwareApplicationLd } from '@/lib/structured-data';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'polypulse' });
  return buildPageMetadata({
    locale,
    segment: 'polypulse',
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

const PHONE_PLACEHOLDER = 'aspect-[780/1768] w-full max-w-[260px] rounded-[2rem]';

const FEATURE_ICONS = {
  voices: Layers,
  presets: LayoutGrid,
  visualizer: Target,
  mixer: SlidersHorizontal,
  coach: GraduationCap,
  progress: LineChart,
  hotUpdate: Zap,
  privacy: ShieldCheck,
} as const;

export default async function PolypulsePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('polypulse');

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
      <JsonLd
        data={softwareApplicationLd({
          locale,
          segment: 'polypulse',
          name: 'Cadence Polypulse',
          description: t('meta.description'),
        })}
      />
      <AppHero
        eyebrow={t('hero.eyebrow')}
        name="Cadence Polypulse"
        tagline={t('hero.tagline')}
        availabilityLabel={t('availability.badge')}
        guidesHref="/polypulse/guides"
        guidesLabel={t('hero.guidesCta')}
        media={
          <ScreenshotPlaceholder
            label="Cadence Polypulse"
            caption={t('screenshots.player')}
            className={PHONE_PLACEHOLDER}
          />
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
          {(['player', 'mixer', 'coach'] as const).map((key) => (
            <ScreenshotItem key={key} caption={t(`screenshots.${key}`)}>
              <ScreenshotPlaceholder
                label="Cadence Polypulse"
                caption={t(`screenshots.${key}`)}
                className={PHONE_PLACEHOLDER}
              />
            </ScreenshotItem>
          ))}
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
        href="/polypulse/guides"
        cta={t('guides.cta')}
      />
    </>
  );
}
