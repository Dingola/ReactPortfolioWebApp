import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import { PageSectionNavigation } from './PageSectionNavigation';

const items = [
  { id: 'experience', label: 'Professional experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
] as const;

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PageSectionNavigation', () => {
  it('marks the final section active once it becomes prominent in the viewport', () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const topById: Record<string, number> = {
        experience: -1_200,
        education: -200,
        skills: 600,
      };
      const top = topById[this.id] ?? 0;

      return {
        bottom: top + 500,
        height: 500,
        left: 0,
        right: 1_000,
        top,
        width: 1_000,
        x: 0,
        y: top,
        toJSON: () => undefined,
      };
    });
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);

    renderWithProviders(
      <>
        <section id="experience" />
        <section id="education" />
        <section id="skills" />
        <PageSectionNavigation items={items} title="Resume overview" />
      </>,
    );

    expect(screen.getByRole('link', { name: /Kenntnisse/ })).toHaveAttribute(
      'aria-current',
      'location',
    );
  });
});
