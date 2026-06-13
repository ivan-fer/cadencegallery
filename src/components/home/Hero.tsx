import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden">
      {/* Glow sutil de marca detrás del hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--accent) 10%, transparent), transparent)',
        }}
      />
      <Container className="flex flex-col items-center py-20 text-center sm:py-28">
        <img
          src="/brand/mark_color.svg"
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
          className="h-16 w-16 animate-fade-up"
        />
        <h1
          className="mt-8 animate-fade-up text-4xl font-extrabold tracking-tight text-text sm:text-6xl"
          style={{ animationDelay: '80ms' }}
        >
          Cadence <span className="text-gallery">Gallery</span>
        </h1>
        <p
          className="mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-text-muted sm:text-xl"
          style={{ animationDelay: '160ms' }}
        >
          {t('tagline')}
        </p>
        <div
          className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: '240ms' }}
        >
          <ButtonLink href="/metronome" variant="primary" size="lg">
            {t('ctaMetronome')}
          </ButtonLink>
          <ButtonLink href="/polypulse" variant="secondary" size="lg">
            {t('ctaPolypulse')}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
