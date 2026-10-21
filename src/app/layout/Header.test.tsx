import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import { Header } from './Header';

describe('Header', () => {
  it('closes the mobile navigation through navigation, backdrop, and Escape', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole('button', { name: /navigation öffnen/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);

    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('navigation', { name: 'Hauptnavigation' })).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'Navigation schließen' }));

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();

    await user.click(menuButton);
    await user.click(screen.getAllByRole('link', { name: /start/i }).at(-1)!);

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    await user.keyboard('{Escape}');

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
  });
});
