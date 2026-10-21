import { flushSync } from 'react-dom';

import { Button } from '@/components/ui/Button';

import { useLocale } from '../locale/useLocale';
import { useTheme } from './useTheme';
import styles from './ThemeToggle.module.css';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

/** Renders a control that switches between the resolved light and dark themes. */
export function ThemeToggle() {
  const { translate } = useLocale();
  const { resolvedTheme, setPreference } = useTheme();
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const visibleLabel = translate(resolvedTheme === 'dark' ? 'Light' : 'Dark');
  const actionLabel = translate(
    nextTheme === 'dark' ? 'Switch to dark theme' : 'Switch to light theme',
  );

  const switchTheme = () => {
    const transitionDocument = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!transitionDocument.startViewTransition || reduceMotion) {
      setPreference(nextTheme);
      return;
    }

    transitionDocument.startViewTransition(() => {
      flushSync(() => setPreference(nextTheme));
    });
  };

  return (
    <Button
      aria-label={`${visibleLabel} – ${actionLabel}`}
      className={`${styles.toggle} ${resolvedTheme === 'dark' ? styles.dark : ''}`}
      onClick={switchTheme}
      title={actionLabel}
      variant="secondary"
    >
      <span className={styles.icon} aria-hidden="true">
        <svg className={styles.sun} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3.25" />
          <path d="M12 2.25v2M12 19.75v2M2.25 12h2M19.75 12h2M5.1 5.1l1.42 1.42M17.48 17.48l1.42 1.42M18.9 5.1l-1.42 1.42M6.52 17.48 5.1 18.9" />
        </svg>
        <svg className={styles.moon} viewBox="0 0 24 24">
          <path d="M20 15.25A8.25 8.25 0 0 1 8.75 4a8.25 8.25 0 1 0 11.25 11.25Z" />
        </svg>
      </span>
    </Button>
  );
}
