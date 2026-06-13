import { useTranslations } from 'next-intl';
import { Container } from './Container';

/**
 * Placeholder de página para la Fase 1 (estructura sin contenido real).
 * Cada página se completará en su fase correspondiente.
 */
export function PagePlaceholder({ title }: { title: string }) {
  const t = useTranslations('common.placeholder');

  return (
    <Container className="py-24 sm:py-32">
      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
        {t('comingSoon')}
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-prose text-text-muted">{t('note')}</p>
    </Container>
  );
}
