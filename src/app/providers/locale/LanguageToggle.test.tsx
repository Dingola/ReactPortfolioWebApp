import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { translateMessage } from '@/i18n/messages';
import { renderWithProviders, screen } from '@/test/test-utils';

import { LanguageToggle } from './LanguageToggle';

describe('LanguageToggle', () => {
  it('uses German by default without storing a preference automatically', () => {
    renderWithProviders(<LanguageToggle />);
    const germanLabel = translateMessage('de', 'German');
    const englishLabel = translateMessage('de', 'English');

    expect(document.documentElement).toHaveAttribute('lang', 'de');
    expect(screen.getByRole('button', { name: `DE – ${germanLabel}` })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: `EN – ${englishLabel}` })).toBeEnabled();
    expect(window.localStorage.getItem('locale-preference')).toBeNull();
  });

  it('activates and stores English after an explicit selection', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageToggle />);

    await user.click(screen.getByRole('button', { name: 'EN – Englisch' }));

    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(screen.getByRole('button', { name: 'EN – English' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(window.localStorage.getItem('locale-preference')).toBe('"en"');
  });
});
