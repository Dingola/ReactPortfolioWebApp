import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import { ErrorBoundary } from './ErrorBoundary';

function BrokenContent(): never {
  throw new Error('Intentional rendering failure');
}

describe('ErrorBoundary', () => {
  it('replaces an unhandled rendering failure with the global recovery view', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    renderWithProviders(
      <ErrorBoundary>
        <BrokenContent />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('heading', { name: 'Ein Fehler ist aufgetreten' })).toBeInTheDocument();
    expect(screen.queryByText('Intentional rendering failure')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Erneut versuchen/i })).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
