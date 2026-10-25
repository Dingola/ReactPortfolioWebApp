import { Component, type ErrorInfo, type ReactNode } from 'react';

import { ErrorFallback } from './ErrorFallback';

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
 * Router failures are handled separately so this boundary remains a final safeguard
 * for provider and application-shell errors.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  /** Updates boundary state after a descendant throws while rendering. */
  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  /** Reports an unhandled descendant rendering error during local development. */
  public componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Unhandled rendering error', error, info);
    }
  }

  /** Renders the protected subtree or the application error fallback. */
  public render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          description="Reload the page and try again."
          statusCode={500}
          title="Something went wrong"
        />
      );
    }

    return this.props.children;
  }
}
