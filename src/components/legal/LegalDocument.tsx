import { Fragment } from 'react';
import { Container } from '@/components/ui/Container';
import { Prose } from '@/components/ui/Prose';

export type LegalSection = {
  heading: string;
  body?: string[];
  list?: string[];
};

type LegalDocumentProps = {
  title: string;
  updatedLabel: string;
  /** Fecha ISO (para el atributo `dateTime`). */
  updatedDate: string;
  /** Fecha ya formateada según el locale (para mostrar). */
  formattedDate: string;
  intro?: string;
  sections: LegalSection[];
  contactHeading: string;
  contactBody: string;
  email: string;
};

/**
 * Documento legal (privacidad, términos): título, fecha de última actualización,
 * secciones con headings + párrafos/listas, y bloque de contacto. Texto largo
 * tipografiado con `.prose-cadence`.
 */
export function LegalDocument({
  title,
  updatedLabel,
  updatedDate,
  formattedDate,
  intro,
  sections,
  contactHeading,
  contactBody,
  email,
}: LegalDocumentProps) {
  return (
    <Container as="article" className="py-16 sm:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">{title}</h1>
        <p className="mt-4 font-mono text-sm text-text-subtle">
          {updatedLabel}:{' '}
          <time dateTime={updatedDate}>{formattedDate}</time>
        </p>
      </header>

      <Prose className="mt-12">
        {intro && <p>{intro}</p>}
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
          </Fragment>
        ))}
        <h2>{contactHeading}</h2>
        <p>
          {contactBody} <a href={`mailto:${email}`}>{email}</a>.
        </p>
      </Prose>
    </Container>
  );
}
