import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import { RouteErrorPage } from './RouteErrorPage';

const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

afterEach(() => {
  consoleError.mockClear();
});

describe('RouteErrorPage', () => {
  it('hides technical details when a route fails unexpectedly', async () => {
    const router = createMemoryRouter(
      [
        {
          errorElement: <RouteErrorPage />,
          loader: () => {
            throw new Error('Sensitive internal failure details');
          },
          path: '/',
        },
      ],
      { initialEntries: ['/'] },
    );

    renderWithProviders(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: 'Diese Seite konnte nicht geladen werden' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Sensitive internal failure details')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Erneut versuchen/i })).toBeInTheDocument();
  });

  it('presents route-level not-found responses without a retry action', async () => {
    const router = createMemoryRouter(
      [
        {
          errorElement: <RouteErrorPage />,
          loader: () => {
            throw new Response('Missing', { status: 404 });
          },
          path: '/',
        },
      ],
      { initialEntries: ['/'] },
    );

    renderWithProviders(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: 'Seite nicht gefunden' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Erneut versuchen/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Kontaktseite öffnen' })).not.toBeInTheDocument();
  });
});
