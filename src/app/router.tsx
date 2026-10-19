import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from './App';
import { RouteLoadingState } from './RouteLoadingState';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const ImprintPage = lazy(() => import('@/pages/ImprintPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ResumePage = lazy(() => import('@/pages/ResumePage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const WorkPage = lazy(() => import('@/pages/WorkPage'));

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
          <Suspense fallback={<RouteLoadingState />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'work',
        element: (
          <Suspense fallback={<RouteLoadingState />}>
            <WorkPage />
          </Suspense>
        ),
      },
      {
        path: 'work/:slug',
        element: (
          <Suspense fallback={<RouteLoadingState />}>
            <ProjectDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'resume',
        element: (
          <Suspense fallback={<RouteLoadingState />}>
            <ResumePage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<RouteLoadingState />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<RouteLoadingState />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: 'impressum',
        element: (
          <Suspense fallback={<RouteLoadingState />}>
            <ImprintPage />
          </Suspense>
        ),
      },
      {
        path: 'privacy',
        element: (
          <Suspense fallback={<RouteLoadingState />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<RouteLoadingState />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
