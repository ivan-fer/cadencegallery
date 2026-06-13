'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';
import { cn } from '@/lib/cn';

// El tema vive en el DOM (clase `dark` en <html>, aplicada por el script inline
// del layout sin FOUC). Lo leemos con useSyncExternalStore para reflejarlo tras
// la hidratación sin provocar setState-en-effect ni mismatch de SSR.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains('dark');
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const t = useTranslations('common.theme');
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !dark;
    const el = document.documentElement;
    el.classList.toggle('dark', next); // el MutationObserver dispara el re-render
    el.style.colorScheme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // localStorage no disponible (modo privado): se ignora.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t('switchToLight') : t('switchToDark')}
      className="relative inline-flex size-9 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface hover:text-text"
    >
      {/* Ambos iconos montados; crossfade + rotación al alternar el tema. */}
      <Sun
        className={cn(
          'absolute size-[18px] transition-all duration-300 ease-cadence',
          dark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0',
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          'absolute size-[18px] transition-all duration-300 ease-cadence',
          dark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100',
        )}
        aria-hidden="true"
      />
    </button>
  );
}
