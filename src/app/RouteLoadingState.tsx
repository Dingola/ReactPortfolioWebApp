import { Container } from '@/components/layout/Container';

import { useLocale } from './providers/locale/useLocale';
import styles from './RouteLoadingState.module.css';

/** Displays application-aligned feedback while a lazy route is being resolved. */
export function RouteLoadingState() {
  const { translate } = useLocale();

  return (
    <Container as="section" className={styles.loadingState} aria-live="polite" aria-busy="true">
      <div className={styles.content}>
        <span className={styles.indicator} aria-hidden="true" />
        <p role="status">{translate('Loading…')}</p>
      </div>
    </Container>
  );
}
