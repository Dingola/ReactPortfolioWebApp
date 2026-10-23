import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useLocale } from '@/app/providers/locale/useLocale';
import type { Locale } from '@/i18n/locales';

const descriptions: Record<Locale, string> = {
  de: 'Portfolio von Adrian Helbig mit C++- und Qt-Projekten, Berufserfahrung und technischen Kenntnissen.',
  en: 'Adrian Helbig’s portfolio featuring C++ and Qt projects, professional experience, and technical skills.',
};

const openGraphLocales: Record<Locale, string> = {
  de: 'de_DE',
  en: 'en_GB',
};

function updateAlternateLink(locale: Locale | 'x-default', href: string) {
  const selector = `link[rel="alternate"][hreflang="${locale}"]`;
  const link = document.head.querySelector<HTMLLinkElement>(selector);

  if (link) {
    link.href = href;
  }
}

/** Synchronises document metadata and alternate-language links with the active locale. */
export function useLocaleMetadata() {
  const { locale } = useLocale();
  const location = useLocation();

  useEffect(() => {
    const description = descriptions[locale];
    const descriptionMeta = document.head.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const openGraphDescription = document.head.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]',
    );
    const openGraphLocale = document.head.querySelector<HTMLMetaElement>(
      'meta[property="og:locale"]',
    );
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const currentUrl = new URL(location.pathname, window.location.origin);
    const germanUrl = new URL(currentUrl);
    const englishUrl = new URL(currentUrl);

    germanUrl.searchParams.set('lang', 'de');
    englishUrl.searchParams.set('lang', 'en');
    currentUrl.searchParams.set('lang', locale);

    descriptionMeta?.setAttribute('content', description);
    openGraphDescription?.setAttribute('content', description);
    openGraphLocale?.setAttribute('content', openGraphLocales[locale]);

    if (canonical) {
      canonical.href = currentUrl.href;
    }

    updateAlternateLink('de', germanUrl.href);
    updateAlternateLink('en', englishUrl.href);
    updateAlternateLink('x-default', germanUrl.href);
  }, [locale, location.pathname]);
}
