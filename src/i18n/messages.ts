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
  | 'Back to projects'
  | 'Project goal'
  | 'Starting point'
  | 'Solution'
  | 'Key features'
  | 'Technical decisions'
  | 'Quality assurance'
  | 'Repository'
  | 'Documentation'
  | 'Live website'
  | 'Project screenshots'
  | 'Image viewer'
  | 'Open image viewer'
  | 'Close image viewer'
  | 'Previous image'
  | 'Next image'
  | 'Image'
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
  | 'Image could not be loaded.'
  | 'Professional experience'
  | 'Education'
  | 'Skills'
  | 'Qualification'
  | 'Visit organisation website'
  | 'Career history, education, and technical expertise.'
  | 'How I approach software development.'
  | 'Working principles'
  | 'My workspace'
  | "Adrian Helbig's workspace"
  | 'View GitHub profile'
  | 'Let us talk about software, projects, and new opportunities.'
  | 'Contact form'
  | 'Direct contact'
  | 'Your name'
  | 'Your email address'
  | 'Your message'
  | 'Send message'
  | 'Sending message…'
  | 'Please enter your name.'
  | 'Please enter a valid email address.'
  | 'Please write at least three words.'
  | 'Thank you. Your message has been sent successfully.'
  | 'Your message could not be sent. Please try again later or use one of the direct contact options.'
  | 'Your data is stored only to process your request. Find all details in the'
  | 'privacy policy'
  | 'Legal information'
  | 'Legal notice'
  | 'Information according to Section 5 DDG'
  | 'Publisher and author'
  | 'Contact details'
  | 'Use contact form'
  | 'Privacy policy'
  | 'The privacy policy is being prepared and will be reviewed before publication.'
  | 'Content pending review'
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
