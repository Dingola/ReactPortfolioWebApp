import { NavLink } from 'react-router-dom';

import { germanPortfolioContent } from '@/content/portfolio.de';

import { useLocale } from '../providers/locale/useLocale';
import styles from './PrimaryNavigation.module.css';

export interface PrimaryNavigationProps {
  /** Optional DOM identifier used by the mobile menu control. */
  readonly id?: string;
  /** Called after a route link is activated, for example to close a mobile menu. */
  readonly onNavigate?: () => void;
  /** Layout variant used for desktop or mobile presentation. */
  readonly variant?: 'desktop' | 'mobile';
}

/** Renders the ordered primary portfolio routes with an active-route indicator. */
export function PrimaryNavigation({ id, onNavigate, variant = 'desktop' }: PrimaryNavigationProps) {
  const { translate } = useLocale();

  return (
    <nav
      id={id}
      className={`${styles.navigation} ${styles[variant]}`}
      aria-label={translate('Primary navigation')}
    >
      <ol className={styles.list}>
        {germanPortfolioContent.navigation.map((item) => {
          const label = translate(item.label);

          return (
            <li key={item.id}>
              <NavLink
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                end={item.path === '/'}
                onClick={onNavigate}
                to={item.path}
              >
                <span className={styles.index}>{String(item.index).padStart(2, '0')}</span>
                <span aria-hidden="true">/</span>
                <span>{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
