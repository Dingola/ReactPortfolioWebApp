import { Link } from 'react-router-dom';

import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { SocialLinks } from '@/components/navigation/SocialLinks';

import styles from './Footer.module.css';

/** Renders the application-wide footer with the current year and portfolio owner. */
export function Footer() {
  const { content, translate } = useLocale();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.identity}>
          <span>© {new Date().getFullYear()}</span>
          <span>{content.profile.name}</span>
        </div>
        <nav aria-label={translate('Legal information')}>
          <Link to="/impressum">{translate('Legal notice')}</Link>
          <Link to="/privacy">{translate('Privacy policy')}</Link>
        </nav>
        <SocialLinks className={styles.socialLinks} />
      </Container>
    </footer>
  );
}
