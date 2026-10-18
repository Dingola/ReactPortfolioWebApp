import { Button } from '@/components/ui/Button';

import { useLocale } from '../locale/useLocale';
import { useTheme } from './useTheme';

/** Renders a control that switches between the resolved light and dark themes. */
export function ThemeToggle() {
  const { translate } = useLocale();
  const { resolvedTheme, setPreference } = useTheme();
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      aria-label={translate(
        nextTheme === 'dark' ? 'Switch to dark theme' : 'Switch to light theme',
      )}
      onClick={() => setPreference(nextTheme)}
      variant="secondary"
    >
      {translate(resolvedTheme === 'dark' ? 'Light' : 'Dark')}
    </Button>
  );
}
