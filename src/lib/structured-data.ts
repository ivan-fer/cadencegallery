import { localizedUrl, OG_IMAGE, SITE_NAME, SITE_URL } from './metadata';

const ORG_LOGO = `${SITE_URL}/brand/icons/icon-512.png`;
const CONTACT_EMAIL = 'contacto@cadencegallery.com';

/** Organización (la marca) — mejora el knowledge panel / SERP de marca. */
export function organizationLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: localizedUrl(locale, ''),
    logo: ORG_LOGO,
    email: CONTACT_EMAIL,
  };
}

/** Sitio web. */
export function webSiteLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: localizedUrl(locale, ''),
    inLanguage: locale,
  };
}

type SoftwareApplicationArgs = {
  locale: string;
  segment: string;
  name: string;
  description: string;
};

/**
 * App musical. Sin `offers`/precio: las apps todavía no están publicadas, así que
 * no afirmamos disponibilidad ni precio en las tiendas.
 */
export function softwareApplicationLd({
  locale,
  segment,
  name,
  description,
}: SoftwareApplicationArgs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: localizedUrl(locale, segment),
    applicationCategory: 'MusicApplication',
    operatingSystem: 'iOS, Android',
    inLanguage: locale,
    image: `${SITE_URL}${OG_IMAGE}`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  };
}
