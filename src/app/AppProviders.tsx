import { RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from './errors/ErrorBoundary';
import { LocaleProvider } from './providers/locale/LocaleProvider';
import { ThemeProvider } from './providers/theme/ThemeProvider';
import { router } from './router';

/**
 * Composes the application-wide providers and installs the client-side router.
 *
 * Provider order is intentional: locale messages remain available to the error
 * fallback, while the boundary protects the theme and routing layers.
 */
export function AppProviders() {
  return (
    <LocaleProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ErrorBoundary>
    </LocaleProvider>
  );
}
