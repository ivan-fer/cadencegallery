import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: HTML/CSS/JS sin servidor (Cloudflare Pages).
  output: 'export',
  // Sirve cada ruta como carpeta con index.html (/es/metronome/index.html).
  trailingSlash: true,
  // Sin optimización dinámica de imágenes en export; se pre-optimizan a WebP.
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
