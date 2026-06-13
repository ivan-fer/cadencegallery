import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

type SectionProps = ComponentProps<'section'> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
  /** Revela header y cuerpo con un fade-up escalonado al entrar en viewport. */
  reveal?: boolean;
};

/** Sección con ritmo vertical y header opcional (eyebrow + título + descripción). */
export function Section({
  eyebrow,
  title,
  description,
  className,
  containerClassName,
  reveal = false,
  children,
  ...props
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || description);

  const header = hasHeader && (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
          {title}
        </h2>
      )}
      {description && <p className="mt-4 text-lg leading-relaxed text-text-muted">{description}</p>}
    </div>
  );

  const body = children && <div className={cn(hasHeader && 'mt-12')}>{children}</div>;

  return (
    <section className={cn('py-16 sm:py-24', className)} {...props}>
      <Container className={containerClassName}>
        {reveal ? (
          <>
            {header && <Reveal>{header}</Reveal>}
            {body && <Reveal delay={hasHeader ? 90 : 0}>{body}</Reveal>}
          </>
        ) : (
          <>
            {header}
            {body}
          </>
        )}
      </Container>
    </section>
  );
}
