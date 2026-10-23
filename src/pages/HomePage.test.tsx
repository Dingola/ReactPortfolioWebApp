import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen, within } from '@/test/test-utils';

import HomePage from './HomePage';

describe('HomePage', () => {
  it('presents the portfolio introduction, primary actions, and technology stack', () => {
    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /hi, ich bin adrian helbig/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('C++-Softwareentwickler', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projekte ansehen/i })).toHaveAttribute(
      'href',
      '/work',
    );
    expect(screen.getByRole('link', { name: /kontakt aufnehmen/i })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(screen.getByRole('link', { name: /GitHub-Profil ansehen/i })).toHaveAttribute(
      'href',
      'https://github.com/Dingola',
    );
    expect(screen.getByRole('link', { name: /LinkedIn-Profil ansehen/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/adrian-helbig',
    );
    expect(screen.getByRole('img', { name: /porträt von adrian helbig/i })).toHaveAttribute(
      'src',
      '/images/profile/adrian-helbig.png',
    );
    const technologyStack = screen.getByRole('region', { name: /technologie-stack/i });
    expect(technologyStack).toBeInTheDocument();
    expect(within(technologyStack).getByText('C++20')).toBeInTheDocument();
    expect(within(technologyStack).getByText('Qt 6')).toBeInTheDocument();
    expect(within(technologyStack).getByText('GitHub Actions')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /qt log viewer mit geöffneter logdatei/i }),
    ).toHaveAttribute('src', '/images/projects/qt-log-viewer/log-view.png');
    expect(screen.getAllByRole('button', { name: /bild vergrößern/i })).toHaveLength(2);
    expect(screen.getByRole('link', { name: /projekt ansehen/i })).toHaveAttribute(
      'href',
      '/work/qt-log-viewer',
    );
  });

  it('presents translated content and media descriptions in English', () => {
    window.localStorage.setItem('locale-preference', '"en"');

    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /hi, i'm adrian helbig/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('C++ Software Developer', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute('href', '/work');
    expect(
      screen.getByRole('img', { name: /qt log viewer displaying an open log file/i }),
    ).toHaveAttribute('src', '/images/projects/qt-log-viewer/log-view.png');
  });
});
