/** Locales planned for the portfolio. */
export const supportedLocales = ['de', 'en'] as const;

/** Locale identifier used by content and user-interface translations. */
export type Locale = (typeof supportedLocales)[number];

/** Default locale used without inspecting browser preferences. */
export const defaultLocale: Locale = 'de';

/** Locales whose translations and portfolio content are ready for visitors. */
export const availableLocales: readonly Locale[] = ['de'];

/** Checks whether a value is a recognized locale identifier. */
export function isLocale(value: unknown): value is Locale {
  return supportedLocales.some((locale) => locale === value);
}

/** Checks whether a recognized locale is ready to be selected. */
export function isLocaleAvailable(locale: Locale): boolean {
  return availableLocales.includes(locale);
}
