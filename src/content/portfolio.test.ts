import { describe, expect, it } from 'vitest';

import { getNavigationItemByPath, getProjectBySlug, validatePortfolioContent } from './portfolio';
import { germanPortfolioContent } from './portfolio.de';
import type { PortfolioContent } from './types';

describe('German portfolio content', () => {
  it('resolves primary navigation and project entries by stable keys', () => {
    expect(getNavigationItemByPath(germanPortfolioContent, '/resume')?.label).toBe('Lebenslauf');
    expect(getProjectBySlug(germanPortfolioContent, 'qt-log-viewer')?.title).toBe('Qt Log Viewer');
    expect(getProjectBySlug(germanPortfolioContent, 'unknown-project')).toBeUndefined();
  });

  it('passes structural content validation', () => {
    expect(validatePortfolioContent(germanPortfolioContent)).toEqual([]);
  });

  it('reports duplicate identifiers, routes, and project slugs', () => {
    const invalidContent: PortfolioContent = {
      ...germanPortfolioContent,
      navigation: [...germanPortfolioContent.navigation, germanPortfolioContent.navigation[0]],
      projects: [...germanPortfolioContent.projects, germanPortfolioContent.projects[0]],
    };

    expect(validatePortfolioContent(invalidContent).map((issue) => issue.code)).toEqual([
      'duplicate-id',
      'duplicate-id',
      'duplicate-navigation-path',
      'duplicate-project-slug',
    ]);
  });
});
