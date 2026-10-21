import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import WorkPage from './WorkPage';

describe('WorkPage', () => {
  it('renders confirmed projects and their available source links', () => {
    renderWithProviders(
      <MemoryRouter>
        <WorkPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Projekte' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Qt Log Viewer' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Qt Widgets Common Library' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'React Portfolio Web App' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Qt Log Viewer' })).toHaveAttribute(
      'href',
      '/work/qt-log-viewer',
    );
    expect(screen.getAllByRole('link', { name: /quellcode/i })).toHaveLength(3);
    expect(screen.getAllByRole('link', { name: /projekt ansehen/i })).toHaveLength(3);
    expect(screen.getAllByRole('link', { name: /projekt ansehen/i })[0]).toHaveAttribute(
      'href',
      '/work/qt-log-viewer',
    );
    expect(screen.getAllByRole('button', { name: /bild vergrößern/i })).toHaveLength(1);
  });

  it('filters projects by category', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <MemoryRouter>
        <WorkPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('radio', { name: 'Werkzeuge' }));

    expect(screen.getByRole('heading', { name: 'Qt Log Viewer' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Qt Widgets Common Library' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'React Portfolio Web App' }),
    ).not.toBeInTheDocument();
  });
});
