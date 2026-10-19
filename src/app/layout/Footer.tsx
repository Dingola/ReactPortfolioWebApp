import { Link } from 'react-router-dom';

import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { germanPortfolioContent } from '@/content/portfolio.de';

import styles from './Footer.module.css';

/** Renders the application-wide footer with the current year and portfolio owner. */
export function Footer() {
  const { translate } = useLocale();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <span>© {new Date().getFullYear()}</span>
        <nav aria-label={translate('Legal information')}>
          <Link to="/impressum">{translate('Legal notice')}</Link>
          <Link to="/privacy">{translate('Privacy policy')}</Link>
        </nav>
        <span>{germanPortfolioContent.profile.name}</span>
      </Container>
    </footer>
  );
}
