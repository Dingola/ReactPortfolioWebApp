import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './LegalPage.module.css';

/** Provides the structure for the privacy policy without publishing unreviewed legal text. */
export default function PrivacyPage() {
  const { translate } = useLocale();

  useDocumentTitle(`${translate('Privacy policy')} · ${appConfig.name}`);

  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{translate('Legal information')}</p>
        <h1>{translate('Privacy policy')}</h1>
        <p>
          {translate(
            'The privacy policy is being prepared and will be reviewed before publication.',
          )}
        </p>
      </header>

      <div className={styles.privacyContent}>
        <p className={styles.placeholder}>{translate('Content pending review')}</p>
      </div>
    </Container>
  );
}
