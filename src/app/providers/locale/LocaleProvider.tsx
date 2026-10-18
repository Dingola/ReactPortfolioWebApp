import { type ReactNode, useCallback, useLayoutEffect, useMemo, useState } from 'react';

import {
  availableLocales,
  defaultLocale,
  isLocale,
  isLocaleAvailable,
  type Locale,
} from '@/i18n/locales';
import { translateMessage, type SourceMessage } from '@/i18n/messages';
import { getStoredValue, setStoredValue } from '@/lib/storage';

import { LocaleContext } from './LocaleContext';

/** Props accepted by {@link LocaleProvider}. */
export interface LocaleProviderProps {
  /** Application subtree that receives access to the active locale. */
  readonly children: ReactNode;
}

const storageKey = 'locale-preference';

function getInitialLocale(): Locale {
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
    }
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    setStoredValue(storageKey, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      availableLocales,
      setLocale,
      translate: (source: SourceMessage) => translateMessage(locale, source),
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
