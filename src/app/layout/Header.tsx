import { Link } from 'react-router-dom';

import { Container } from '@/components/layout/Container';

import { appConfig } from '../config';
import { LanguageToggle } from '../providers/locale/LanguageToggle';
import { useLocale } from '../providers/locale/useLocale';
import { ThemeToggle } from '../providers/theme/ThemeToggle';
import styles from './Header.module.css';

/** Renders the application-wide header, home link, and color-theme control. */
export function Header() {
  const { translate } = useLocale();

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link
          className={styles.brand}
          to="/"
          aria-label={`${appConfig.name}: ${translate('Go to home page')}`}
        >
          {appConfig.name}
        </Link>
        <div className={styles.actions}>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
