import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { translateMessage } from '@/i18n/messages';
import { renderWithProviders, screen } from '@/test/test-utils';

import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('switches the resolved theme', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    expect(window.localStorage.getItem('theme-preference')).toBeNull();

    await user.click(
      screen.getByRole('button', {
        name: `${translateMessage('de', 'Dark')} – ${translateMessage(
          'de',
          'Switch to dark theme',
        )}`,
      }),
    );

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(window.localStorage.getItem('theme-preference')).toBe('"dark"');
    expect(
      screen.getByRole('button', {
        name: `${translateMessage('de', 'Light')} – ${translateMessage(
          'de',
          'Switch to light theme',
        )}`,
      }),
    ).toBeInTheDocument();
  });
});
