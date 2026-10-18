import { describe, expect, it } from 'vitest';

import { getNavigationDirection, getPortfolioRouteIndex, isPortfolioRoute } from './navigation';

describe('portfolio navigation order', () => {
  it('resolves primary routes and project details to stable positions', () => {
    expect(getPortfolioRouteIndex('/')).toBe(0);
    expect(getPortfolioRouteIndex('/resume')).toBe(2);
    expect(getPortfolioRouteIndex('/work/qt-log-viewer')).toBe(1);
    expect(getPortfolioRouteIndex('/missing')).toBeUndefined();
    expect(isPortfolioRoute('/contact')).toBe(true);
    expect(isPortfolioRoute('/work/qt-log-viewer')).toBe(false);
  });

  it('distinguishes forward, backward, and neutral transitions', () => {
    expect(getNavigationDirection('/', '/contact')).toBe('forward');
    expect(getNavigationDirection('/about', '/work')).toBe('backward');
    expect(getNavigationDirection('/work', '/work/qt-log-viewer')).toBe('none');
    expect(getNavigationDirection('/missing', '/')).toBe('none');
  });
});
