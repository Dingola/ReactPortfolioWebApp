import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from './App';

const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function RouteFallback() {
  return <p role="status">Loading…</p>;
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
