import { Fragment } from 'react';

import { supportedLocales, type Locale } from '@/i18n/locales';
import type { SourceMessage } from '@/i18n/messages';

import styles from './LanguageToggle.module.css';
import { useLocale } from './useLocale';

const localeLabels: Record<Locale, SourceMessage> = {
  de: 'German',
  en: 'English',
};

/** Renders the locale selector and disables languages without complete content. */
export function LanguageToggle() {
  const { availableLocales, locale, setLocale, translate } = useLocale();

  return (
    <div className={styles.toggle} role="group" aria-label={translate('Language')}>
      {supportedLocales.map((option) => {
        const isAvailable = availableLocales.includes(option);
        const isActive = locale === option;
        const label = translate(localeLabels[option]);
        const abbreviation = option.toUpperCase();
        const accessibleLabel = isAvailable
          ? `${abbreviation} – ${label}`
          : `${abbreviation} – ${label}: ${translate('English version in preparation')}`;

        return (
          <Fragment key={option}>
            {option === supportedLocales[0] ? null : (
              <span className={styles.separator} aria-hidden="true">
                /
              </span>
            )}
            <button
              aria-label={accessibleLabel}
              aria-pressed={isActive}
              className={`${styles.option} ${isActive ? styles.active : ''}`}
              disabled={!isAvailable}
              onClick={() => setLocale(option)}
              title={isAvailable ? label : translate('English version in preparation')}
              type="button"
            >
              {abbreviation}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
