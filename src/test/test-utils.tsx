import type { ReactElement } from 'react';

import { render, type RenderOptions } from '@testing-library/react';

import { LocaleProvider } from '@/app/providers/locale/LocaleProvider';
import { ThemeProvider } from '@/app/providers/theme/ThemeProvider';

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(
    <LocaleProvider>
      <ThemeProvider>{ui}</ThemeProvider>
    </LocaleProvider>,
    options,
  );
}

export * from '@testing-library/react';
