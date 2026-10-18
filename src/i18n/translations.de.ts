import type { TranslationCatalog } from './messages';

/** German translations for the English source messages used by the application. */
export const germanTranslations = {
  'Skip to main content': 'Zum Hauptinhalt springen',
  'Loading…': 'Wird geladen …',
  'Go to home page': 'Zur Startseite',
  'Primary navigation': 'Hauptnavigation',
  Menu: 'Menü',
  'Open navigation menu': 'Navigation öffnen',
  'Close navigation menu': 'Navigation schließen',
  Home: 'Start',
  Work: 'Projekte',
  Resume: 'Lebenslauf',
  About: 'Über mich',
  Contact: 'Kontakt',
  Language: 'Sprache',
  German: 'Deutsch',
  English: 'Englisch',
  'English version in preparation': 'Englische Version in Vorbereitung',
  Dark: 'Dunkel',
  Light: 'Hell',
  'Switch to dark theme': 'Zum dunklen Farbschema wechseln',
  'Switch to light theme': 'Zum hellen Farbschema wechseln',
  'React · TypeScript · Vite': 'React · TypeScript · Vite',
  'A modern developer portfolio built with React and TypeScript.':
    'Ein modernes Developer-Portfolio mit React und TypeScript.',
  'This home page will be implemented in the next design step.':
    'Diese Startseite wird im nächsten Designschritt umgesetzt.',
  'This section is being prepared.': 'Dieser Bereich wird derzeit vorbereitet.',
  'Page not found': 'Seite nicht gefunden',
  'The requested page does not exist.': 'Die angeforderte Seite existiert nicht.',
  'Return to the home page': 'Zurück zur Startseite',
  'Something went wrong': 'Ein Fehler ist aufgetreten',
  'Reload the page and try again.': 'Lade die Seite neu und versuche es noch einmal.',
} as const satisfies TranslationCatalog;
