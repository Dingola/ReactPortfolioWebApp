import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import privacyPolicyHtml from '@/content/privacy-policy.de.html?raw';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './LegalPage.module.css';

const hasPrivacyPolicy = privacyPolicyHtml.replace(/<!--[\s\S]*?-->/g, '').trim().length > 0;

/** Presents the reviewed privacy policy stored as generator-provided HTML. */
export default function PrivacyPage() {
  const { translate } = useLocale();

  useDocumentTitle(`${translate('Privacy policy (German)')} · ${appConfig.name}`);

  return (
    <Container className={styles.page}>
      <p className={styles.eyebrow}>{translate('Legal information')}</p>

      {hasPrivacyPolicy ? (
        <div
          className={styles.privacyContent}
          lang="de"
          // The HTML is a reviewed, repository-owned legal document and never user input.
          dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }}
        />
      ) : (
        <header className={styles.header}>
          <h1>{translate('Privacy policy (German)')}</h1>
          <p>
            {translate(
              'The privacy policy is being prepared and will be reviewed before publication.',
            )}
          </p>
          <p className={styles.placeholder}>{translate('Content pending review')}</p>
        </header>
      )}
    </Container>
  );
}
