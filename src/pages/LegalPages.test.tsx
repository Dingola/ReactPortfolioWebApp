import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import ImprintPage from './ImprintPage';
import PrivacyPage from './PrivacyPage';

describe('legal pages', () => {
  it('renders the confirmed legal notice details and destinations', () => {
    renderWithProviders(
      <MemoryRouter>
        <ImprintPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Impressum' })).toBeInTheDocument();
    expect(screen.getByText('Angaben gemäß § 5 DDG')).toBeInTheDocument();
    expect(screen.getByText(/Buschrosensteig 9/)).toBeInTheDocument();
    expect(screen.getByText(/12347 Berlin/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'email@adrianhelbig.de' })).toHaveAttribute(
      'href',
      'mailto:email@adrianhelbig.de',
    );
    expect(screen.getByRole('link', { name: 'Kontaktformular verwenden' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('creates review placeholders without copying the previous privacy policy', () => {
    renderWithProviders(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Datenschutzerklärung' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Inhalt wird noch ergänzt und geprüft.')).toBeInTheDocument();
    expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0);
  });
});
