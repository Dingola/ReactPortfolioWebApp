import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import ProjectDetailPage from './ProjectDetailPage';

function renderProjectRoute(path: string) {
  return renderWithProviders(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="work/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProjectDetailPage', () => {
  it('renders the structured Qt Log Viewer project content', () => {
    renderProjectRoute('/work/qt-log-viewer');

    expect(screen.getByRole('heading', { level: 1, name: 'Qt Log Viewer' })).toBeInTheDocument();
    expect(screen.getByText('Projektziel')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Zentrale Funktionen' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Qualitätssicherung' })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(4);
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'src',
      '/images/projects/qt-log-viewer/log-view.png',
    );
    expect(screen.getByRole('heading', { name: 'Projekteinblicke' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /zurück zu den projekten/i })).toHaveAttribute(
      'href',
      '/work',
    );
  });

  it('renders available projects without empty image sections', () => {
    const { container } = renderProjectRoute('/work/qt-widgets-common-lib');

    expect(
      screen.getByRole('heading', { level: 1, name: 'Qt Widgets Common Library' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(container.querySelector('figure')).not.toBeInTheDocument();
  });

  it('uses the not-found experience for unknown project slugs', () => {
    renderProjectRoute('/work/unknown-project');

    expect(screen.getByRole('heading', { name: 'Seite nicht gefunden' })).toBeInTheDocument();
  });
});
