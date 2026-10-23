import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { LanguageToggle } from '@/app/providers/locale/LanguageToggle';
import { renderWithProviders, screen, waitFor } from '@/test/test-utils';

import { useLocaleMetadata } from './useLocaleMetadata';

function MetadataProbe() {
  useLocaleMetadata();
  return <LanguageToggle />;
}

describe('useLocaleMetadata', () => {
  it('updates descriptions and alternate links for the selected language', async () => {
    const user = userEvent.setup();
    document.head.insertAdjacentHTML(
      'beforeend',
      '<meta name="description"><meta name="robots"><meta name="twitter:description"><meta property="og:description"><meta property="og:locale"><meta property="og:url"><link rel="canonical"><link rel="alternate" hreflang="de"><link rel="alternate" hreflang="en"><link rel="alternate" hreflang="x-default">',
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/work']}>
        <MetadataProbe />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'EN – Englisch' }));

    await waitFor(() => {
      expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
        'content',
        expect.stringContaining('Selected software projects'),
      );
    });
    expect(document.head.querySelector('meta[property="og:locale"]')).toHaveAttribute(
      'content',
      'en_GB',
    );
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://adrianhelbig.de/work?lang=en',
    );
    expect(document.head.querySelector('link[hreflang="de"]')).toHaveAttribute(
      'href',
      'https://adrianhelbig.de/work',
    );
    expect(document.head.querySelector('link[hreflang="en"]')).toHaveAttribute(
      'href',
      'https://adrianhelbig.de/work?lang=en',
    );
    expect(document.head.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://adrianhelbig.de/work?lang=en',
    );
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index, follow',
    );

    document.head
      .querySelectorAll('meta[name], meta[property^="og:"], link[rel]')
      .forEach((element) => element.remove());
  });
});
