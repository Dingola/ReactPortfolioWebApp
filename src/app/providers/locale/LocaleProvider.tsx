import { type ReactNode, useCallback, useLayoutEffect, useMemo, useState } from 'react';

import {
  availableLocales,
  defaultLocale,
  isLocale,
  isLocaleAvailable,
  type Locale,
} from '@/i18n/locales';
import { translateMessage, type SourceMessage } from '@/i18n/messages';
import { germanPortfolioContent } from '@/content/portfolio.de';
import { englishPortfolioContent } from '@/content/portfolio.en';
import type { PortfolioContent } from '@/content/types';
import { getStoredValue, setStoredValue } from '@/lib/storage';

import { LocaleContext } from './LocaleContext';

/** Props accepted by {@link LocaleProvider}. */
export interface LocaleProviderProps {
  /** Application subtree that receives access to the active locale. */
  readonly children: ReactNode;
}

const storageKey = 'locale-preference';
const portfolioContent: Record<Locale, PortfolioContent> = {
  de: germanPortfolioContent,
  en: englishPortfolioContent,
};

function getInitialLocale(): Locale {
  const requestedLocale = new URLSearchParams(window.location.search).get('lang');

  if (isLocale(requestedLocale) && isLocaleAvailable(requestedLocale)) {
    return requestedLocale;
  }

  const storedLocale = getStoredValue<unknown>(storageKey, defaultLocale);
  return isLocale(storedLocale) && isLocaleAvailable(storedLocale) ? storedLocale : defaultLocale;
}

/**
 * Provides localized messages and persists explicit language selections.
 *
 * Browser language preferences are intentionally ignored so German remains the
 * predictable default until a visitor selects another complete locale.
 */
export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, updateLocale] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((nextLocale: Locale) => {
    if (isLocaleAvailable(nextLocale)) {
      updateLocale(nextLocale);
      setStoredValue(storageKey, nextLocale);

      const url = new URL(window.location.href);
      url.searchParams.set('lang', nextLocale);
      window.history.replaceState(window.history.state, '', url);
    }
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      content: portfolioContent[locale],
      availableLocales,
      setLocale,
      translate: (source: SourceMessage) => translateMessage(locale, source),
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
