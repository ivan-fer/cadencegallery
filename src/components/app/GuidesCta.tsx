import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

type GuidesCtaProps = {
  title: string;
  description: string;
  href: '/metronome/guides' | '/polypulse/guides';
  cta: string;
};

export function GuidesCta({ title, description, href, cta }: GuidesCtaProps) {
  return (
    <section className="border-t border-border">
      <Container className="flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-text">{title}</h2>
          <p className="mt-2 leading-relaxed text-text-muted">{description}</p>
        </div>
        <ButtonLink href={href} variant="primary" size="lg" className="shrink-0">
          {cta}
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </Container>
    </section>
  );
}
