import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';

type SectionProps = ComponentProps<'section'> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
};

/** Sección con ritmo vertical y header opcional (eyebrow + título + descripción). */
export function Section({
  eyebrow,
  title,
  description,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || description);

  return (
    <section className={cn('py-16 sm:py-24', className)} {...props}>
      <Container className={containerClassName}>
        {hasHeader && (
          <div className="max-w-2xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg leading-relaxed text-text-muted">{description}</p>
            )}
          </div>
        )}
        {children && <div className={cn(hasHeader && 'mt-12')}>{children}</div>}
      </Container>
    </section>
  );
}
