import { describe, expect, it } from 'vitest';

import { getNavigationItemByPath, getProjectBySlug, validatePortfolioContent } from './portfolio';
import { germanPortfolioContent } from './portfolio.de';
import { englishPortfolioContent } from './portfolio.en';
import type { PortfolioContent, ProjectLinks } from './types';

describe('German portfolio content', () => {
  it('resolves primary navigation and project entries by stable keys', () => {
    expect(getNavigationItemByPath(germanPortfolioContent, '/resume')?.label).toBe('Resume');
    expect(getProjectBySlug(germanPortfolioContent, 'qt-log-viewer')?.title).toBe('Qt Log Viewer');
    expect(getProjectBySlug(germanPortfolioContent, 'unknown-project')).toBeUndefined();
  });

  it('passes structural content validation', () => {
    expect(validatePortfolioContent(germanPortfolioContent)).toEqual([]);
    expect(validatePortfolioContent(englishPortfolioContent)).toEqual([]);
  });

  it('keeps stable identifiers and routes aligned across both languages', () => {
    expect(englishPortfolioContent.projects.map(({ id }) => id)).toEqual(
      germanPortfolioContent.projects.map(({ id }) => id),
    );
    expect(englishPortfolioContent.navigation.map(({ path }) => path)).toEqual(
      germanPortfolioContent.navigation.map(({ path }) => path),
    );
    expect(englishPortfolioContent.profile.role).toBe('C++ Software Developer');
    expect(getProjectBySlug(englishPortfolioContent, 'qt-log-viewer')?.images[0]?.alt).toMatch(
      /displaying an open log file/i,
    );
  });

  it('provides compact links for supporting public repositories', () => {
    expect(germanPortfolioContent.publicRepositories).toHaveLength(3);
    expect(
      germanPortfolioContent.publicRepositories.every(({ repository }) =>
        /^https:\/\/github\.com\/Dingola\//.test(repository),
      ),
    ).toBe(true);
  });

  it('provides compact links for reusable project templates', () => {
    expect(germanPortfolioContent.projectTemplates).toHaveLength(4);
    expect(
      germanPortfolioContent.projectTemplates.every(({ repository }) =>
        /^https:\/\/github\.com\/Dingola\/.+Template$/.test(repository),
      ),
    ).toBe(true);
  });

  it('provides detail content and explicit public links for every project', () => {
    expect(germanPortfolioContent.projects).toHaveLength(5);

    for (const project of germanPortfolioContent.projects) {
      const links: ProjectLinks = project.links;

      expect(project.details.goal).not.toHaveLength(0);
      expect(project.details.problem).not.toHaveLength(0);
      expect(project.details.solution).not.toHaveLength(0);
      expect(project.details.features.length).toBeGreaterThan(0);
      expect(project.details.technicalDecisions.length).toBeGreaterThan(0);
      expect(project.details.qualityAssurance.length).toBeGreaterThan(0);
      const repositoryLinks = links.repositories?.map(({ href }) => href) ?? [];
      const publicRepositories = links.repository
        ? [links.repository, ...repositoryLinks]
        : repositoryLinks;

      expect(publicRepositories.length).toBeGreaterThan(0);
      expect(
        publicRepositories.every((href) => /^https:\/\/github\.com\/Dingola\//.test(href)),
      ).toBe(true);

      if (links.documentation) {
        expect(links.documentation).toContain('#readme');
      }
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
