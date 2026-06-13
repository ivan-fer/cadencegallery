import { useTranslations } from 'next-intl';
import { Badge } from './Badge';
import { Container } from './Container';

/**
 * Placeholder de página (estructura sin contenido real todavía).
 * Cada página se completará en su fase correspondiente.
 */
export function PagePlaceholder({ title }: { title: string }) {
  const t = useTranslations('common.placeholder');

  return (
    <Container className="py-24 sm:py-32">
      <Badge variant="accent">{t('comingSoon')}</Badge>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-text-muted">{t('note')}</p>
    </Container>
  );
}
