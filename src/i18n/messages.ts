import type { Locale } from './locales';
import { germanTranslations } from './translations.de';

/** English source messages accepted by the translation function. */
export type SourceMessage =
  | 'Skip to main content'
  | 'Loading…'
  | 'Go to home page'
  | 'Language'
  | 'German'
  | 'English'
  | 'English version in preparation'
  | 'Dark'
  | 'Light'
  | 'Switch to dark theme'
  | 'Switch to light theme'
  | 'React · TypeScript · Vite'
  | 'A modern developer portfolio built with React and TypeScript.'
  | 'This home page will be implemented in the next design step.'
  | 'Page not found'
  | 'The requested page does not exist.'
  | 'Return to the home page'
  | 'Something went wrong'
  | 'Reload the page and try again.';

/** Complete translation mapping for every English source message. */
export type TranslationCatalog = Record<SourceMessage, string>;

const translationCatalogs: Partial<Record<Locale, TranslationCatalog>> = {
  de: germanTranslations,
};

/** Translates an English source message into the active locale. */
export function translateMessage(locale: Locale, source: SourceMessage): string {
  if (locale === 'en') {
    return source;
  }

  const catalog = translationCatalogs[locale];

  if (!catalog) {
    throw new Error(`No complete translation catalog is available for locale: ${locale}`);
  }

  return catalog[source];
}
