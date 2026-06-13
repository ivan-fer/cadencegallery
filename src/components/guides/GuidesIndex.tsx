import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Section } from '@/components/ui/Section';

export type GuideSummary = {
  slug: string;
  title: string;
  summary: string;
};

type GuidesIndexProps = {
  eyebrow: string;
  title: string;
  description: string;
  readMore: string;
  /** Base de las rutas de guía, p.ej. `/metronome/guides`. */
  basePath: string;
  guides: GuideSummary[];
};

/** Índice de guías de una app: header + lista de cards enlazadas a cada guía. */
export function GuidesIndex({
  eyebrow,
  title,
  description,
  readMore,
  basePath,
  guides,
}: GuidesIndexProps) {
  return (
    <Section eyebrow={eyebrow} title={title} description={description}>
      <ul className="grid gap-5 sm:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug} className="flex">
            <Link
              href={`${basePath}/${guide.slug}`}
              className="group flex w-full flex-col rounded-2xl border border-border bg-surface p-6 transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-black/5"
            >
              <h3 className="text-xl font-bold tracking-tight text-text">{guide.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-text-muted">{guide.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent">
                {readMore}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
