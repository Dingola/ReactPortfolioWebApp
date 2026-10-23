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

  it('renders the privacy policy and its contact form delivery provider', () => {
    renderWithProviders(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>,
    );

    const privacyHeading = screen.getByRole('heading', {
      level: 1,
      name: /Datenschutz.erklärung/,
    });

    expect(privacyHeading).toBeInTheDocument();
    expect(privacyHeading.closest('[lang="de"]')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'E-Mail-Versand mit Resend' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Verarbeitung über Cloudflare Workers' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'E-Mail-Empfang und -Speicherung bei IONOS',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Lokale Speicherung von Darstellungs- und Spracheinstellungen',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Anfrage per E-Mail' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'https://www.cloudflare.com/cloudflare-customer-scc/' }),
    ).toHaveAttribute('href', 'https://www.cloudflare.com/cloudflare-customer-scc/');
    expect(screen.queryByText(/Telefonnummer der verantwortlichen Stelle/)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Telefon oder Telefax/ })).not.toBeInTheDocument();
  });
});
