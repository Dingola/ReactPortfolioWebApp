import { Container } from '@/components/layout/Container';
import { germanPortfolioContent } from '@/content/portfolio.de';

import styles from './Footer.module.css';

/** Renders the application-wide footer with the current year and portfolio owner. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <span>© {new Date().getFullYear()}</span>
        <span>{germanPortfolioContent.profile.name}</span>
      </Container>
    </footer>
  );
}
