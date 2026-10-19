import type { Locale } from './locales';
import { germanTranslations } from './translations.de';

/** English source messages accepted by the translation function. */
export type SourceMessage =
  | 'Skip to main content'
  | 'Loading…'
  | 'Go to home page'
  | 'Primary navigation'
  | 'Menu'
  | 'Open navigation menu'
  | 'Close navigation menu'
  | 'Home'
  | 'Work'
  | 'Resume'
  | 'About'
  | 'Contact'
  | 'Language'
  | 'German'
  | 'English'
  | 'English version in preparation'
  | 'Dark'
  | 'Light'
  | 'Switch to dark theme'
  | 'Switch to light theme'
  | 'C++ · Qt · Desktop applications'
  | "Hi, I'm"
  | 'View projects'
  | 'Get in touch'
  | 'Technology stack'
  | 'Portrait of Adrian Helbig'
  | 'A look at my work'
  | 'View project'
  | 'Projects'
  | 'Selected software projects and the technologies behind them.'
  | 'Filter projects'
  | 'All projects'
  | 'Web applications'
  | 'Tools'
  | 'Libraries'
  | 'Games'
  | 'Other projects'
  | 'Source code'
  | 'Project preview'
  | 'Professional experience'
  | 'Education'
  | 'Skills'
  | 'Qualification'
  | 'Visit organisation website'
  | 'Career history, education, and technical expertise.'
  | 'This section is being prepared.'
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
