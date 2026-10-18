import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from './App';
import { useLocale } from './providers/locale/useLocale';

const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const RoutePlaceholderPage = lazy(() => import('@/pages/RoutePlaceholderPage'));

function RouteFallback() {
  const { translate } = useLocale();

  return <p role="status">{translate('Loading…')}</p>;
}

/**
 * Client-side route configuration for the application.
 *
 * Route-level components are loaded lazily to keep the initial JavaScript bundle
 * focused on the application shell.
 */
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      ...(['/work', '/resume', '/about', '/contact'] as const).map((path) => ({
        path: path.slice(1),
        element: (
          <Suspense fallback={<RouteFallback />}>
            <RoutePlaceholderPage path={path} />
          </Suspense>
        ),
      })),
      {
        path: '*',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
