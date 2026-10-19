import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from './App';
import { primaryNavigationItems } from './navigation';
import { useLocale } from './providers/locale/useLocale';

const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const RoutePlaceholderPage = lazy(() => import('@/pages/RoutePlaceholderPage'));
const WorkPage = lazy(() => import('@/pages/WorkPage'));

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
      {
        path: 'work',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <WorkPage />
          </Suspense>
        ),
      },
      ...primaryNavigationItems
        .filter((item) => item.path !== '/' && item.path !== '/work')
        .map((item) => ({
          path: item.path.slice(1),
          element: (
            <Suspense fallback={<RouteFallback />}>
              <RoutePlaceholderPage path={item.path} />
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
