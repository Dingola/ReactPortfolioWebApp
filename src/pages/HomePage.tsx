import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';

import styles from './HomePage.module.css';

/** Renders the neutral start page intended to be replaced by the first product route. */
export default function HomePage() {
  const { translate } = useLocale();
  useDocumentTitle(appConfig.name);

  return (
    <Container as="section" className={styles.hero}>
      <p className={styles.eyebrow}>{translate('React · TypeScript · Vite')}</p>
      <h1>{appConfig.name}</h1>
      <p>{translate('A modern developer portfolio built with React and TypeScript.')}</p>
      <p className={styles.hint}>
        {translate('This home page will be implemented in the next design step.')}
      </p>
    </Container>
  );
}
