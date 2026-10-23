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
      '<meta name="description"><meta property="og:description"><meta property="og:locale"><link rel="canonical"><link rel="alternate" hreflang="de"><link rel="alternate" hreflang="en"><link rel="alternate" hreflang="x-default">',
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
        expect.stringContaining('C++ and Qt projects'),
      );
    });
    expect(document.head.querySelector('meta[property="og:locale"]')).toHaveAttribute(
      'content',
      'en_GB',
    );
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'http://localhost:3000/work?lang=en',
    );
    expect(document.head.querySelector('link[hreflang="de"]')).toHaveAttribute(
      'href',
      'http://localhost:3000/work?lang=de',
    );
    expect(document.head.querySelector('link[hreflang="en"]')).toHaveAttribute(
      'href',
      'http://localhost:3000/work?lang=en',
    );

    document.head
      .querySelectorAll('meta[name="description"], meta[property^="og:"], link[rel]')
      .forEach((element) => element.remove());
  });
});
