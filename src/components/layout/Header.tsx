'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';
import { Link } from '@/i18n/navigation';
import { LocaleSwitch } from './LocaleSwitch';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/metronome', key: 'metronome' },
  { href: '/polypulse', key: 'polypulse' },
] as const;

export function Header() {
  const t = useTranslations('common');
  const [scrolled, setScrolled] = useState(false);

  // Sombra sutil cuando el header sticky se despega del top de la página.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-bg/80 backdrop-blur transition-shadow duration-200',
        scrolled ? 'border-border shadow-sm shadow-black/5' : 'border-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-surface px-4 py-2 text-sm font-semibold text-text shadow focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        {t('header.skipToContent')}
      </a>

      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={t('header.home')} className="inline-flex items-center">
          <img
            src="/brand/lockup_light.svg"
            alt="Cadence Gallery"
            width={150}
            height={30}
            className="h-[30px] w-auto dark:hidden"
          />
          <img
            src="/brand/lockup_dark.svg"
            alt=""
            aria-hidden="true"
            width={150}
            height={30}
            className="hidden h-[30px] w-auto dark:block"
          />
        </Link>

        <nav aria-label={t('header.primaryNav')} className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-text-muted transition-colors hover:text-text"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
          <span className="mx-1 hidden h-5 w-px bg-divider sm:block" aria-hidden="true" />
          <LocaleSwitch />
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
