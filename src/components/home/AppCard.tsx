import { ArrowRight } from 'lucide-react';
import { ScreenshotPlaceholder } from '@/components/ui/ScreenshotPlaceholder';
import { Link } from '@/i18n/navigation';

type AppCardProps = {
  href: '/metronome' | '/polypulse';
  name: string;
  tagline: string;
  cta: string;
  screenshotCaption: string;
};

/** Card de app del home: card interactiva clickeable que enlaza al detalle. */
export function AppCard({ href, name, tagline, cta, screenshotCaption }: AppCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-border bg-surface p-6 transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-black/5"
    >
      <ScreenshotPlaceholder label={name} caption={screenshotCaption} className="aspect-video" />
      <h3 className="mt-5 text-xl font-bold text-text">{name}</h3>
      <p className="mt-2 leading-relaxed text-text-muted">{tagline}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        {cta}
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
