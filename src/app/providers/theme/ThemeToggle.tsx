import { Button } from '@/components/ui/Button';

import { useLocale } from '../locale/useLocale';
import { useTheme } from './useTheme';

/** Renders a control that switches between the resolved light and dark themes. */
export function ThemeToggle() {
  const { translate } = useLocale();
  const { resolvedTheme, setPreference } = useTheme();
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const visibleLabel = translate(resolvedTheme === 'dark' ? 'Light' : 'Dark');
  const actionLabel = translate(
    nextTheme === 'dark' ? 'Switch to dark theme' : 'Switch to light theme',
  );

  return (
    <Button
      aria-label={`${visibleLabel} – ${actionLabel}`}
      onClick={() => setPreference(nextTheme)}
      variant="secondary"
    >
      {visibleLabel}
    </Button>
  );
}
