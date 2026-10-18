import { Button } from '@/components/ui/Button';
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

        return (
          <Button
            key={option}
            aria-label={
              isAvailable ? label : `${label}: ${translate('English version in preparation')}`
            }
            aria-pressed={isActive}
            className={`${styles.option} ${isActive ? styles.active : ''}`}
            disabled={!isAvailable}
            onClick={() => setLocale(option)}
            title={isAvailable ? label : translate('English version in preparation')}
            variant="secondary"
          >
            {option.toUpperCase()}
          </Button>
        );
      })}
    </div>
  );
}
