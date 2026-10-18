import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import { PrimaryNavigation } from './PrimaryNavigation';

describe('PrimaryNavigation', () => {
  it('marks the matching portfolio route as current', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/resume']}>
        <PrimaryNavigation />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /03.*lebenslauf/i })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: /01.*start/i })).not.toHaveAttribute('aria-current');
  });
});
