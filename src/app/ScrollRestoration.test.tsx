import { act } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders, waitFor } from '@/test/test-utils';

import { App } from './App';

const scrollTo = vi.fn();
const scrollIntoView = vi.fn();

function createTestRouter(initialEntry = '/') {
  return createMemoryRouter(
    [
      {
        element: <App />,
        children: [
          { index: true, element: <div>First page</div> },
          {
            path: 'second',
            element: <div id="target">Second page</div>,
          },
        ],
      },
    ],
    { initialEntries: [initialEntry] },
  );
}

describe('route scroll restoration', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', { configurable: true, value: scrollTo });
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true });
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });
  });

  afterEach(() => {
    scrollTo.mockReset();
    scrollIntoView.mockReset();
    sessionStorage.removeItem('react-router-scroll-positions');
  });

  it('scrolls a new route to the top', async () => {
    const router = createTestRouter();
    renderWithProviders(<RouterProvider router={router} />);
    scrollTo.mockClear();

    await act(() => router.navigate('/second'));

    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith(0, 0));
  });

  it('restores the previous position during history navigation', async () => {
    const router = createTestRouter();
    renderWithProviders(<RouterProvider router={router} />);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 640, writable: true });

    await act(() => router.navigate('/second'));
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 920, writable: true });
    scrollTo.mockClear();
    await act(() => router.navigate(-1));

    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith(0, 640));
  });

  it('restores a saved position when a link opens the same URL again', async () => {
    const router = createTestRouter();
    renderWithProviders(<RouterProvider router={router} />);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 640, writable: true });

    await act(() => router.navigate('/second'));
    scrollTo.mockClear();
    await act(() => router.navigate('/'));

    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith(0, 640));
  });

  it('preserves fragment navigation for matching page elements', async () => {
    const router = createTestRouter();
    renderWithProviders(<RouterProvider router={router} />);

    await act(() => router.navigate('/second#target'));

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
  });
});
