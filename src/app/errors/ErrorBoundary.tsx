import { Component, type ErrorInfo, type ReactNode } from 'react';

import { useLocale } from '../providers/locale/useLocale';

function LocalizedErrorFallback() {
  const { translate } = useLocale();

  return (
    <main className="fatal-error" role="alert">
      <h1>{translate('Something went wrong')}</h1>
      <p>{translate('Reload the page and try again.')}</p>
    </main>
  );
}

/** Props accepted by {@link ErrorBoundary}. */
export type ErrorBoundaryProps = {
  /** Application subtree protected by the boundary. */
  children: ReactNode;
};

/** Internal state maintained by {@link ErrorBoundary}. */
export type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Catches unhandled rendering errors and replaces the application with a safe fallback.
 *
 * Connect `componentDidCatch` to an application-specific monitoring service when one
 * is available.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  /** Updates boundary state after a descendant throws while rendering. */
  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  /** Reports an unhandled descendant rendering error. */
  public componentDidCatch(error: Error, info: ErrorInfo) {
    // Replace this with an application-specific monitoring integration when needed.
    console.error('Unhandled rendering error', error, info);
  }

  /** Renders the protected subtree or the fatal-error fallback. */
  public render() {
    if (this.state.hasError) {
      return <LocalizedErrorFallback />;
    }

    return this.props.children;
  }
}
