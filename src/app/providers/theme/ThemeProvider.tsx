import { type ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { getStoredValue, setStoredValue } from '@/lib/storage';

import { ThemeContext, type ThemePreference } from './ThemeContext';

/** Props accepted by {@link ThemeProvider}. */
export type ThemeProviderProps = {
  /** Application subtree that receives access to the theme context. */
  children: ReactNode;
};

const storageKey = 'theme-preference';
const defaultPreference: ThemePreference = 'system';

function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

function getInitialPreference(): ThemePreference {
  const storedPreference = getStoredValue(storageKey, defaultPreference);
  return isThemePreference(storedPreference) ? storedPreference : defaultPreference;
}

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Resolves, applies, and persists the application's color-theme preference.
 *
 * A `system` preference tracks operating-system changes without overwriting the
 * stored preference.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, updatePreference] = useState<ThemePreference>(getInitialPreference);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);
  const resolvedTheme = preference === 'system' ? systemTheme : preference;
  const setPreference = useCallback((nextPreference: ThemePreference) => {
    updatePreference(nextPreference);
    setStoredValue(storageKey, nextPreference);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', updateSystemTheme);
    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ preference, resolvedTheme, setPreference }),
    [preference, resolvedTheme, setPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
