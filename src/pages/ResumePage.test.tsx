import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import ResumePage from './ResumePage';

describe('ResumePage', () => {
  it('renders every migrated career and education station', () => {
    renderWithProviders(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Lebenslauf' })).toBeInTheDocument();
    expect(
      screen.getByText(/Gesellschaft zur Förderung angewandter Informatik/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Forschungsbereich Signalverarbeitung/)).toBeInTheDocument();
    expect(screen.getByText(/Global Health Care/)).toBeInTheDocument();
    expect(screen.getByText(/Auguste-Viktoria-Klinikum/)).toBeInTheDocument();
    expect(screen.getByText(/Hochschule für Technik und Wirtschaft/)).toBeInTheDocument();
    expect(screen.getByText(/Oberstufenzentrum Kommunikations/)).toBeInTheDocument();
    expect(screen.getByText(/Katholische Schule Sankt Marien/)).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Science (B. Sc.)')).toBeInTheDocument();
    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getAllByText('Schüler')).toHaveLength(2);
    expect(screen.getByText('MSVC')).toHaveAttribute('data-emphasis', 'primary');
    expect(screen.getByText('Clang (Format / Tidy)')).toHaveAttribute('data-emphasis', 'primary');
    expect(screen.getByText('Visual Studio')).toHaveAttribute('data-emphasis', 'primary');
    expect(
      screen.getByText('OpenGL', { selector: 'li[data-emphasis="supporting"]' }),
    ).toHaveAttribute('data-emphasis', 'supporting');
    expect(screen.getByText('React')).toHaveAttribute('data-emphasis', 'supporting');
  });

  it('preserves organisation and related project links from the previous portfolio', () => {
    renderWithProviders(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /DynaBeam/i })).toHaveAttribute(
      'href',
      expect.stringContaining('dynabeam'),
    );
    expect(screen.getByRole('link', { name: /NoiseImage Conclusions/i })).toHaveAttribute(
      'href',
      expect.stringContaining('noiseimage-conclusions'),
    );
    expect(screen.getByRole('link', { name: /^IAV/i })).toHaveAttribute(
      'href',
      'https://www.iav.com/',
    );
    expect(screen.getByRole('link', { name: /HTW Berlin/i })).toHaveAttribute(
      'href',
      'https://www.htw-berlin.de/',
    );
  });
});
