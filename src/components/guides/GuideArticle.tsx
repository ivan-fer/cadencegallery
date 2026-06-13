import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Fragment } from 'react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { Prose } from '@/components/ui/Prose';

export type GuideSection = {
  heading: string;
  body?: string[];
  list?: string[];
  steps?: string[];
};

type GuideArticleProps = {
  appName: string;
  appHref: string;
  guidesHref: string;
  guidesLabel: string;
  backToGuides: string;
  title: string;
  summary: string;
  sections: GuideSection[];
};

/**
 * Página de una guía individual: breadcrumb (app › guías), título, resumen
 * destacado y secciones (párrafos, listas y pasos ordenados) vía `.prose-cadence`.
 */
export function GuideArticle({
  appName,
  appHref,
  guidesHref,
  guidesLabel,
  backToGuides,
  title,
  summary,
  sections,
}: GuideArticleProps) {
  return (
    <Container as="article" className="py-16 sm:py-24">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-text-subtle"
      >
        <Link href={appHref} className="transition-colors hover:text-text">
          {appName}
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <Link href={guidesHref} className="transition-colors hover:text-text">
          {guidesLabel}
        </Link>
      </nav>

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-text-muted">{summary}</p>
      </header>

      <Prose className="mt-12">
        {sections.map((section) => (
          <Fragment key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body?.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item.slice(0, 32)}>{item}</li>
                ))}
              </ul>
            )}
            {section.steps && (
              <ol>
                {section.steps.map((step) => (
                  <li key={step.slice(0, 32)}>{step}</li>
                ))}
              </ol>
            )}
          </Fragment>
        ))}
      </Prose>

      <div className="mt-14 border-t border-border pt-8">
        <Link
          href={guidesHref}
          className="inline-flex items-center gap-2 font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {backToGuides}
        </Link>
      </div>
    </Container>
  );
}
