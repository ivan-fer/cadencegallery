import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

type AppHeroProps = {
  eyebrow: string;
  name: string;
  tagline: string;
  availabilityLabel: string;
  guidesHref: '/metronome/guides' | '/polypulse/guides';
  guidesLabel: string;
  /** Captura principal o placeholder (lo provee la página). */
  media: ReactNode;
};

export function AppHero({
  eyebrow,
  name,
  tagline,
  availabilityLabel,
  guidesHref,
  guidesLabel,
  media,
}: AppHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(50% 60% at 80% 0%, color-mix(in oklab, var(--accent) 9%, transparent), transparent)',
        }}
      />
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            {name}
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-text-muted">{tagline}</p>
          <div className="mt-6">
            <Badge variant="accent">{availabilityLabel}</Badge>
          </div>
          <div className="mt-8">
            <ButtonLink href={guidesHref} variant="secondary">
              {guidesLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">{media}</div>
      </Container>
    </section>
  );
}
