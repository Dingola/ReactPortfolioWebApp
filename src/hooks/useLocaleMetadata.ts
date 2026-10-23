import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useLocale } from '@/app/providers/locale/useLocale';
import { getProjectBySlug } from '@/content/portfolio';
import type { PortfolioContent } from '@/content/types';
import type { Locale } from '@/i18n/locales';

const siteOrigin = 'https://adrianhelbig.de';

const routeDescriptions: Record<Locale, Record<string, string>> = {
  de: {
    '/work':
      'Ausgewählte Softwareprojekte von Adrian Helbig mit Schwerpunkten auf C++, Qt, React, Architektur und Qualitätssicherung.',
    '/resume':
      'Berufserfahrung, Ausbildung und technische Kenntnisse von C++-Softwareentwickler Adrian Helbig.',
    '/about':
      'Mehr über Adrian Helbig, seine Arbeitsweise und seinen Schwerpunkt auf robuste, modulare Software mit C++ und Qt.',
    '/contact':
      'Kontakt zu Adrian Helbig für einen fachlichen Austausch, eine Position oder ein Softwareprojekt.',
    '/impressum': 'Impressum und Anbieterkennzeichnung der Portfolio-Website von Adrian Helbig.',
    '/privacy': 'Datenschutzerklärung der Portfolio-Website von Adrian Helbig.',
  },
  en: {
    '/work':
      'Selected software projects by Adrian Helbig with a focus on C++, Qt, React, architecture, and quality assurance.',
    '/resume':
      'Professional experience, education, and technical skills of C++ software developer Adrian Helbig.',
    '/about':
      'Learn more about Adrian Helbig, his approach to software development, and his focus on robust, modular C++ and Qt applications.',
    '/contact':
      'Contact Adrian Helbig to discuss a position, a software project, or technical topics.',
    '/impressum': 'Legal notice and provider information for Adrian Helbig’s portfolio website.',
    '/privacy': 'Privacy policy for Adrian Helbig’s portfolio website.',
  },
};

const openGraphLocales: Record<Locale, string> = {
  de: 'de_DE',
  en: 'en_GB',
};

function getRouteMetadata(content: PortfolioContent, pathname: string) {
  if (pathname === '/') {
    return { description: content.profile.introduction, indexable: true };
  }

  if (pathname.startsWith('/work/')) {
    const project = getProjectBySlug(content, pathname.slice('/work/'.length));
    return {
      description: project?.summary ?? content.profile.introduction,
      indexable: Boolean(project),
    };
  }

  const description = routeDescriptions[content.locale][pathname];
  return {
    description: description ?? content.profile.introduction,
    indexable: Boolean(description),
  };
}

function createLocalizedUrl(pathname: string, locale: Locale) {
  const url = new URL(pathname, siteOrigin);

  if (locale !== 'de') {
    url.searchParams.set('lang', locale);
  }

  return url.href;
}

function updateMeta(selector: string, content: string) {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

function updateLink(selector: string, href: string) {
  const link = document.head.querySelector<HTMLLinkElement>(selector);

  if (link) {
    link.href = href;
  }
}

function updateAlternateLink(locale: Locale | 'x-default', href?: string) {
  const selector = `link[rel="alternate"][hreflang="${locale}"]`;
  const existingLink = document.head.querySelector<HTMLLinkElement>(selector);

  if (!href) {
    existingLink?.remove();
    return;
  }

  const link = existingLink ?? document.createElement('link');
  link.rel = 'alternate';
  link.hreflang = locale;
  link.href = href;

  if (!existingLink) {
    document.head.append(link);
  }
}

/** Synchronises document metadata and alternate-language links with the active locale. */
export function useLocaleMetadata() {
  const { content, locale } = useLocale();
  const location = useLocation();

  useEffect(() => {
    const { description, indexable } = getRouteMetadata(content, location.pathname);
    const germanUrl = createLocalizedUrl(location.pathname, 'de');
    const englishUrl = createLocalizedUrl(location.pathname, 'en');
    const supportsEnglish = location.pathname !== '/privacy';
    const currentUrl = locale === 'en' && supportsEnglish ? englishUrl : germanUrl;

    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[property="og:locale"]', openGraphLocales[locale]);
    updateMeta('meta[property="og:url"]', currentUrl);
    updateMeta('meta[name="robots"]', indexable ? 'index, follow' : 'noindex, follow');

    updateLink('link[rel="canonical"]', currentUrl);
    updateAlternateLink('de', germanUrl);
    updateAlternateLink('en', supportsEnglish ? englishUrl : undefined);
    updateAlternateLink('x-default', germanUrl);
  }, [content, locale, location.pathname]);
}
