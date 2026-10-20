import { ScrollRestoration, type Location } from 'react-router-dom';

import styles from './App.module.css';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { PageTransition } from './PageTransition';
import { useLocale } from './providers/locale/useLocale';

function getScrollRestorationKey(location: Location) {
  return `${location.pathname}${location.search}${location.hash}`;
}

/**
 * Provides the persistent application shell shared by all routes.
 *
 * The header and footer remain mounted while the page transition renders the route
 * selected by the visitor.
 */
export function App() {
  const { translate } = useLocale();

  return (
    <div className={styles.app}>
      {/* Allows keyboard users to bypass the primary navigation. */}
      <a className={styles.skipLink} href="#main-content">
        {translate('Skip to main content')}
      </a>
      <Header />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <PageTransition />
      </main>
      <Footer />
      <ScrollRestoration getKey={getScrollRestorationKey} />
    </div>
  );
}
