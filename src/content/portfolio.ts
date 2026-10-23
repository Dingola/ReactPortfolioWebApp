import type { PortfolioContent, PortfolioProject, PortfolioRoute } from './types';

/** A structural problem that would make portfolio content ambiguous or unsafe to link. */
export interface ContentValidationIssue {
  readonly code:
    'duplicate-id' | 'duplicate-navigation-path' | 'duplicate-project-slug' | 'invalid-url';
  readonly path: string;
  readonly message: string;
}

function findDuplicates(values: readonly string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return duplicates;
}

function isSafePublicUrl(value: string) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function isSafeEmailUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'mailto:' && url.pathname.length > 0;
  } catch {
    return false;
  }
}

/** Finds a portfolio project by its stable route slug. */
export function getProjectBySlug(
  content: PortfolioContent,
  slug: string,
): PortfolioProject | undefined {
  return content.projects.find((project) => project.slug === slug);
}

/** Finds a primary navigation item for a known portfolio route. */
export function getNavigationItemByPath(content: PortfolioContent, path: PortfolioRoute) {
  return content.navigation.find((item) => item.path === path);
}

/** Validates identifiers, route keys, slugs, and public URLs across the content source. */
export function validatePortfolioContent(content: PortfolioContent) {
  const issues: ContentValidationIssue[] = [];
  const collections = [
    ['navigation', content.navigation],
    ['projects', content.projects],
    ['publicRepositories', content.publicRepositories],
    ['projectTemplates', content.projectTemplates],
    ['experience', content.experience],
    ['education', content.education],
    ['skillGroups', content.skillGroups],
    ['certificates', content.certificates],
    ['contactLinks', content.contactLinks],
  ] as const;

  for (const [collectionName, entries] of collections) {
    for (const duplicate of findDuplicates(entries.map((entry) => entry.id))) {
      issues.push({
        code: 'duplicate-id',
        path: collectionName,
        message: `Duplicate id: ${duplicate}`,
      });
    }
  }

  for (const duplicate of findDuplicates(content.navigation.map((entry) => entry.path))) {
    issues.push({
      code: 'duplicate-navigation-path',
      path: 'navigation',
      message: `Duplicate navigation path: ${duplicate}`,
    });
  }

  for (const duplicate of findDuplicates(content.projects.map((entry) => entry.slug))) {
    issues.push({
      code: 'duplicate-project-slug',
      path: 'projects',
      message: `Duplicate project slug: ${duplicate}`,
    });
  }

  const urls = [
    ...content.projects.flatMap((entry) =>
      [
        entry.links?.repository,
        ...(entry.links?.repositories?.map(({ href }) => href) ?? []),
        entry.links?.documentation,
        entry.links?.live,
      ].flatMap((url) => (url ? [[`projects.${entry.id}`, url] as const] : [])),
    ),
    ...content.publicRepositories.map(
      (entry) => [`publicRepositories.${entry.id}`, entry.repository] as const,
    ),
    ...content.projectTemplates.map(
      (entry) => [`projectTemplates.${entry.id}`, entry.repository] as const,
    ),
    ...content.experience.flatMap((entry) => [
      ...(entry.organisationUrl
        ? ([[`experience.${entry.id}`, entry.organisationUrl]] as const)
        : []),
      ...entry.highlights.flatMap((detail, index) =>
        detail.link
          ? ([[`experience.${entry.id}.highlights.${index}`, detail.link.href]] as const)
          : [],
      ),
    ]),
    ...content.education.flatMap((entry) => [
      ...(entry.institutionUrl ? ([[`education.${entry.id}`, entry.institutionUrl]] as const) : []),
      ...entry.details.flatMap((detail, index) =>
        detail.link
          ? ([[`education.${entry.id}.details.${index}`, detail.link.href]] as const)
          : [],
      ),
    ]),
    ...content.certificates.flatMap((entry) =>
      entry.credentialUrl ? ([[`certificates.${entry.id}`, entry.credentialUrl]] as const) : [],
    ),
    ...content.contactLinks.flatMap((entry) =>
      entry.kind === 'email' ? [] : [[`contactLinks.${entry.id}`, entry.href] as const],
    ),
  ];

  for (const [path, url] of urls) {
    if (!isSafePublicUrl(url)) {
      issues.push({ code: 'invalid-url', path, message: `Expected an HTTPS URL: ${url}` });
    }
  }

  for (const entry of content.contactLinks.filter((link) => link.kind === 'email')) {
    if (!isSafeEmailUrl(entry.href)) {
      issues.push({
        code: 'invalid-url',
        path: `contactLinks.${entry.id}`,
        message: `Expected a mailto URL: ${entry.href}`,
      });
    }
  }

  return issues;
}

export type * from './types';
