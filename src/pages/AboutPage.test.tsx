import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('presents the professional focus and working principles', () => {
    renderWithProviders(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Über mich' })).toBeInTheDocument();
    expect(screen.getByText(/Desktop-Anwendungen mit C\+\+ und Qt/)).toBeInTheDocument();
    expect(screen.getByText(/Seit 2024.*KI-gestützter und agentischer/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Robuste Lösungen' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Modulare Architektur' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Qualität als Prozess' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Direkter Austausch' })).toBeInTheDocument();
  });

  it('shows the authentic workspace and relevant destinations', () => {
    renderWithProviders(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('img', { name: 'Arbeitsplatz von Adrian Helbig' })).toHaveAttribute(
      'src',
      '/images/about/workplace.png',
    );
    expect(
      screen.getByRole('button', { name: /bild vergrößern: arbeitsplatz von adrian helbig/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Projekte ansehen/ })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: /GitHub-Profil ansehen/ })).toHaveAttribute(
      'href',
      'https://github.com/Dingola',
    );
  });
});
