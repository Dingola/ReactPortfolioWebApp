import { describe, expect, it } from 'vitest';

import { getNavigationItemByPath, getProjectBySlug, validatePortfolioContent } from './portfolio';
import { germanPortfolioContent } from './portfolio.de';
import type { PortfolioContent } from './types';

describe('German portfolio content', () => {
  it('resolves primary navigation and project entries by stable keys', () => {
    expect(getNavigationItemByPath(germanPortfolioContent, '/resume')?.label).toBe('Resume');
    expect(getProjectBySlug(germanPortfolioContent, 'qt-log-viewer')?.title).toBe('Qt Log Viewer');
    expect(getProjectBySlug(germanPortfolioContent, 'unknown-project')).toBeUndefined();
  });

  it('passes structural content validation', () => {
    expect(validatePortfolioContent(germanPortfolioContent)).toEqual([]);
  });

  it('provides detail content and explicit public links for every project', () => {
    expect(germanPortfolioContent.projects).toHaveLength(4);

    for (const project of germanPortfolioContent.projects) {
      expect(project.details.goal).not.toHaveLength(0);
      expect(project.details.problem).not.toHaveLength(0);
      expect(project.details.solution).not.toHaveLength(0);
      expect(project.details.features.length).toBeGreaterThan(0);
      expect(project.details.technicalDecisions.length).toBeGreaterThan(0);
      expect(project.details.qualityAssurance.length).toBeGreaterThan(0);
      expect(project.links.repository).toMatch(/^https:\/\/github\.com\/Dingola\//);
      expect(project.links.documentation).toContain('#readme');
    }

    expect(
      getProjectBySlug(germanPortfolioContent, 'react-portfolio-web-app')?.links?.live,
    ).toBeUndefined();
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
