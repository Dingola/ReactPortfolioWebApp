import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  it('offers safe recovery actions and moves focus to the error heading', async () => {
    const user = userEvent.setup();
    const retry = vi.fn();

    renderWithProviders(
      <ErrorFallback
        description="An unexpected error prevented this page from loading."
        onRetry={retry}
        title="This page could not be loaded"
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Diese Seite konnte nicht geladen werden' }),
    ).toHaveFocus();
    expect(screen.getByText('ERROR / 500')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zur Startseite/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Kontaktseite öffnen' })).toHaveAttribute(
      'href',
      '/contact',
    );

    await user.click(screen.getByRole('button', { name: /Erneut versuchen/i }));

    expect(retry).toHaveBeenCalledOnce();
  });

  it('keeps a not-found page focused on returning home', () => {
    renderWithProviders(
      <ErrorFallback
        description="The requested page does not exist."
        embedded
        showContact={false}
        showRetry={false}
        statusCode={404}
        title="Page not found"
      />,
    );

    expect(screen.getByText('ERROR / 404')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Erneut versuchen/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Kontaktseite öffnen' })).not.toBeInTheDocument();
  });
});
