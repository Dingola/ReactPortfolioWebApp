import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from './App';
import { useLocale } from './providers/locale/useLocale';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ResumePage = lazy(() => import('@/pages/ResumePage'));
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
      {
        path: 'resume',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ResumePage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ContactPage />
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
