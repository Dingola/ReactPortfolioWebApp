import { Link } from 'react-router-dom';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './LegalPage.module.css';

/** Renders the portfolio owner's legal notice and contact information. */
export default function ImprintPage() {
  const { content, translate } = useLocale();
  const { legal } = content;

  useDocumentTitle(`${translate('Legal notice')} · ${appConfig.siteName}`);

  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{translate('Legal information')}</p>
        <h1>{translate('Legal notice')}</h1>
        <p>{translate('Information according to Section 5 DDG')}</p>
      </header>

      <div className={styles.sections}>
        <section className={styles.section} aria-labelledby="publisher-title">
          <h2 id="publisher-title">{translate('Publisher and author')}</h2>
          <div className={styles.sectionContent}>
            <address>
              {legal.operatorName}
              <br />
              {legal.street}
              <br />
              {legal.postalCode} {legal.city}
            </address>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="imprint-contact-title">
          <h2 id="imprint-contact-title">{translate('Contact details')}</h2>
          <div className={styles.sectionContent}>
            <p>
              E-Mail: <a href={`mailto:${legal.email}`}>{legal.email}</a>
            </p>
            <p>
              <Link to="/contact">{translate('Use contact form')}</Link>
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="imprint-privacy-title">
          <h2 id="imprint-privacy-title">{translate('Privacy policy (German)')}</h2>
          <div className={styles.sectionContent}>
            <Link to="/privacy">{translate('Privacy policy (German)')}</Link>
          </div>
        </section>
      </div>
    </Container>
  );
}
