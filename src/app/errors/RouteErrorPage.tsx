import { useEffect } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { ErrorFallback } from './ErrorFallback';

/** Converts router failures into a safe recovery page for visitors. */
export function RouteErrorPage() {
  const error = useRouteError();
  const statusCode = isRouteErrorResponse(error) ? error.status : 500;
  const isNotFound = statusCode === 404;

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error('Unhandled route error', error);
    }
  }, [error]);

  return (
    <ErrorFallback
      description={
        isNotFound
          ? 'The requested page does not exist.'
          : 'An unexpected error prevented this page from loading.'
      }
      showContact={!isNotFound}
      showRetry={!isNotFound}
      statusCode={statusCode}
      title={isNotFound ? 'Page not found' : 'This page could not be loaded'}
    />
  );
}
