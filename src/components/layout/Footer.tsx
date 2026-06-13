import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('common');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-10 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <img
            src="/brand/mark_color.svg"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <p className="mt-4 text-sm leading-relaxed text-text-muted">{t('footer.tagline')}</p>
        </div>

        <div className="flex gap-12 sm:gap-16">
          <nav aria-label={t('footer.apps')}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
              {t('footer.apps')}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/metronome" className="text-text-muted transition-colors hover:text-text">
                  {t('nav.metronome')}
                </Link>
              </li>
              <li>
                <Link href="/polypulse" className="text-text-muted transition-colors hover:text-text">
                  {t('nav.polypulse')}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t('footer.legal')}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
              {t('footer.legal')}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-text-muted transition-colors hover:text-text">
                  {t('nav.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-muted transition-colors hover:text-text">
                  {t('nav.terms')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>

      <div className="border-t border-divider">
        <Container className="py-6">
          <p className="font-mono text-xs text-text-subtle">
            {t('footer.copyright', { year: String(year) })}
          </p>
        </Container>
      </div>
    </footer>
  );
}
