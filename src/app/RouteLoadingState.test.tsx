import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import { RouteLoadingState } from './RouteLoadingState';

describe('RouteLoadingState', () => {
  it('announces route loading within a stable busy region', () => {
    const { container } = renderWithProviders(<RouteLoadingState />);

    expect(screen.getByRole('status')).toHaveTextContent('Wird geladen …');
    expect(container.querySelector('section')).toHaveAttribute('aria-busy', 'true');
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
