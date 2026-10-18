import { describe, expect, it } from 'vitest';

import { translateMessage } from '@/i18n/messages';
import { renderWithProviders, screen } from '@/test/test-utils';

import { LanguageToggle } from './LanguageToggle';

describe('LanguageToggle', () => {
  it('uses German by default and keeps incomplete locales unavailable', () => {
    renderWithProviders(<LanguageToggle />);
    const germanLabel = translateMessage('de', 'German');
    const englishLabel = translateMessage('de', 'English');
    const unavailableLabel = translateMessage('de', 'English version in preparation');

    expect(document.documentElement).toHaveAttribute('lang', 'de');
    expect(screen.getByRole('button', { name: `DE – ${germanLabel}` })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(
      screen.getByRole('button', { name: `EN – ${englishLabel}: ${unavailableLabel}` }),
    ).toBeDisabled();
    expect(window.localStorage.getItem('locale-preference')).toBe('"de"');
  });
});
