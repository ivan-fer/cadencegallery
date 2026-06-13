import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { routing } from '@/i18n/routing';
import { manrope } from '@/lib/fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Cadence Gallery',
    template: '%s · Cadence Gallery',
  },
  description: 'Practice tools for musicians, crafted with care.',
  metadataBase: new URL('https://cadencegallery.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/icons/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/brand/icons/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/brand/icons/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#241826' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Solo se generan los locales declarados; nada se renderiza on-demand (static export).
export const dynamicParams = false;

// Aplica la clase `dark` y el color-scheme antes del primer paint para evitar
// el flash de tema incorrecto (FOUC) en un sitio estático que arranca en claro.
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;if(d)e.classList.add('dark');e.style.colorScheme=d?'dark':'light';}catch(_){}})();`;

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Habilita el render estático de este árbol para el locale dado.
  setRequestLocale(locale);

  return (
    <html lang={locale} className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-text antialiased">
        <NextIntlClientProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
