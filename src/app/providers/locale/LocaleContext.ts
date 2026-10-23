import { createContext } from 'react';

import type { Locale } from '@/i18n/locales';
import type { SourceMessage } from '@/i18n/messages';
import type { PortfolioContent } from '@/content/types';

/** Values exposed to components that consume localized user-interface text. */
export interface LocaleContextValue {
  /** Active locale. */
  readonly locale: Locale;
  /** Portfolio content matching the active locale. */
  readonly content: PortfolioContent;
  /** Locales with complete translations and portfolio content. */
  readonly availableLocales: readonly Locale[];
  /** Selects and persists an available locale. */
  readonly setLocale: (locale: Locale) => void;
  /** Translates an English source message into the active locale. */
  readonly translate: (source: SourceMessage) => string;
}

/** Internal React context consumed through the `useLocale` hook. */
export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);
