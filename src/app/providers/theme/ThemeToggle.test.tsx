import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { translateMessage } from '@/i18n/messages';
import { renderWithProviders, screen } from '@/test/test-utils';

import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('switches the resolved theme', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    await user.click(
      screen.getByRole('button', {
        name: translateMessage('de', 'Switch to dark theme'),
      }),
    );

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(
      screen.getByRole('button', {
        name: translateMessage('de', 'Switch to light theme'),
      }),
    ).toBeInTheDocument();
  });
});
