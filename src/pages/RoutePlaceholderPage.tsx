import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { getNavigationItemByPath } from '@/content/portfolio';
import { germanPortfolioContent } from '@/content/portfolio.de';
import type { PortfolioRoute } from '@/content/types';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './RoutePlaceholderPage.module.css';

export interface RoutePlaceholderPageProps {
  readonly path: Exclude<PortfolioRoute, '/'>;
}

/** Renders a registered portfolio route until its dedicated content is implemented. */
export default function RoutePlaceholderPage({ path }: RoutePlaceholderPageProps) {
  const { translate } = useLocale();
  const navigationItem = getNavigationItemByPath(germanPortfolioContent, path);

  if (!navigationItem) {
    throw new Error(`Missing navigation content for route: ${path}`);
  }

  const label = translate(navigationItem.label);
  useDocumentTitle(`${label} · ${appConfig.name}`);

  return (
    <Container as="section" className={styles.page}>
      <p className="technical-label">
        {String(navigationItem.index).padStart(2, '0')} / {label}
      </p>
      <h1>{label}</h1>
      <p>{translate('This section is being prepared.')}</p>
    </Container>
  );
}
