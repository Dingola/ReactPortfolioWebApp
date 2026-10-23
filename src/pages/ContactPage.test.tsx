import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders, screen, waitFor } from '@/test/test-utils';

import ContactPage from './ContactPage';

vi.mock('@/features/contact/TurnstileWidget', async () => {
  const { useEffect } = await import('react');

  return {
    TurnstileWidget: ({ onTokenChange }: { readonly onTokenChange: (token: string) => void }) => {
      useEffect(() => onTokenChange('test-turnstile-token'), [onTokenChange]);
      return <div aria-label="Spamschutz" />;
    },
  };
});

describe('ContactPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders accessible fields, direct links, and the privacy notice', () => {
    renderWithProviders(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Kontakt' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Ihr Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ihre E-Mail-Adresse/)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/Ihre Nachricht/).tagName).toBe('TEXTAREA');
    expect(screen.getByRole('link', { name: 'Datenschutzerklärung' })).toHaveAttribute(
      'href',
      '/privacy',
    );
    expect(screen.getByRole('link', { name: /email@adrianhelbig.de/ })).toHaveAttribute(
      'href',
      'mailto:email@adrianhelbig.de',
    );
  });

  it('validates the fields before sending', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /Nachricht senden/ }));

    expect(screen.getByText('Bitte geben Sie Ihren Namen an.')).toBeInTheDocument();
    expect(screen.getByText('Bitte geben Sie eine gültige E-Mail-Adresse an.')).toBeInTheDocument();
    expect(screen.getByText('Bitte schreiben Sie mindestens drei Wörter.')).toBeInTheDocument();
  });

  it('submits valid messages and confirms success', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'sent' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    renderWithProviders(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/Ihr Name/), 'Ada Lovelace');
    await user.type(screen.getByLabelText(/Ihre E-Mail-Adresse/), 'ada@example.com');
    await user.type(screen.getByLabelText(/Ihre Nachricht/), 'Ich möchte Kontakt aufnehmen.');
    await user.click(screen.getByRole('button', { name: /Nachricht senden/ }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/erfolgreich übermittelt/);
    });
    expect(fetch).toHaveBeenCalledWith(
      'https://react-portfolio-contact.adrian-helbig.workers.dev/contact',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(fetch).toHaveBeenCalledWith(
      'https://react-portfolio-contact.adrian-helbig.workers.dev/contact',
      expect.objectContaining({
        body: expect.stringContaining('test-turnstile-token'),
      }),
    );
  });
});
