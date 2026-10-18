import { Link } from 'react-router-dom';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

/** Renders the fallback page for URLs that do not match an application route. */
export default function NotFoundPage() {
  const { translate } = useLocale();
  useDocumentTitle(`${translate('Page not found')} · ${appConfig.name}`);

  return (
    <Container as="section">
      <h1>{translate('Page not found')}</h1>
      <p>{translate('The requested page does not exist.')}</p>
      <Link to="/">{translate('Return to the home page')}</Link>
    </Container>
  );
}
