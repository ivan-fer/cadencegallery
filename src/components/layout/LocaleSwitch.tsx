'use client';

import { clsx } from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/**
 * Cambia de idioma manteniendo la página equivalente (usePathname devuelve la
 * ruta sin prefijo de locale; Link la reprefija con el idioma destino).
 * Persiste la elección para que la redirección de la raíz la respete.
 */
export function LocaleSwitch() {
  const t = useTranslations('common.locale');
  const active = useLocale();
  const pathname = usePathname();

  function persist(locale: string) {
    try {
      localStorage.setItem('locale', locale);
    } catch {
      // localStorage no disponible: se ignora.
    }
  }

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="flex items-center rounded-md border border-border p-0.5"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => persist(locale)}
            className={clsx(
              'rounded px-2 py-1 text-xs font-semibold uppercase transition-colors',
              isActive
                ? 'bg-accent text-white'
                : 'text-text-muted hover:text-text',
            )}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
