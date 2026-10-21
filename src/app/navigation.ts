import { germanPortfolioContent } from '@/content/portfolio.de';
import type { PortfolioRoute } from '@/content/types';

/** Relative movement between two routes in the ordered portfolio flow. */
export type NavigationDirection = 'backward' | 'forward' | 'none';

/** Ordered routes used by the primary navigation and directional page transitions. */
export const primaryNavigationItems = germanPortfolioContent.navigation;

function getProjectDetailIndex(pathname: string): number | undefined {
  const projectRoutePrefix = '/work/';

  if (!pathname.startsWith(projectRoutePrefix)) {
    return undefined;
  }

  const slug = pathname.slice(projectRoutePrefix.length);
  const index = germanPortfolioContent.projects.findIndex((project) => project.slug === slug);

  return index >= 0 ? index : undefined;
}

/** Resolves a pathname to its position in the primary portfolio flow. */
export function getPortfolioRouteIndex(pathname: string): number | undefined {
  const normalizedPath = pathname.startsWith('/work/') ? '/work' : pathname;
  const index = primaryNavigationItems.findIndex((item) => item.path === normalizedPath);

  return index >= 0 ? index : undefined;
}

/** Determines the transition direction between two known portfolio routes. */
export function getNavigationDirection(
  previousPath: string,
  nextPath: string,
): NavigationDirection {
  const previousProjectIndex = getProjectDetailIndex(previousPath);
  const nextProjectIndex = getProjectDetailIndex(nextPath);

  if (
    previousProjectIndex !== undefined &&
    nextProjectIndex !== undefined &&
    previousProjectIndex !== nextProjectIndex
  ) {
    return nextProjectIndex > previousProjectIndex ? 'forward' : 'backward';
  }

  const previousIndex = getPortfolioRouteIndex(previousPath);
  const nextIndex = getPortfolioRouteIndex(nextPath);

  if (previousIndex === undefined || nextIndex === undefined || previousIndex === nextIndex) {
    return 'none';
  }

  return nextIndex > previousIndex ? 'forward' : 'backward';
}

/** Narrows an arbitrary pathname to a registered primary portfolio route. */
export function isPortfolioRoute(pathname: string): pathname is PortfolioRoute {
  return primaryNavigationItems.some((item) => item.path === pathname);
}
