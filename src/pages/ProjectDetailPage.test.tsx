import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

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
  const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

  afterEach(() => {
    if (clipboardDescriptor) {
      Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
    } else {
      Reflect.deleteProperty(navigator, 'clipboard');
    }
  });

  it('renders the structured Qt Log Viewer project content', async () => {
    const user = userEvent.setup();
    renderProjectRoute('/work/qt-log-viewer');

    expect(screen.getByRole('heading', { level: 1, name: 'Qt Log Viewer' })).toBeInTheDocument();
    expect(screen.getByText('Projektziel')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Zentrale Funktionen' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Qualitätssicherung' })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'src',
      '/images/projects/qt-log-viewer/log-view.png',
    );
    expect(screen.getByRole('region', { name: 'Projekteinblicke' })).toBeInTheDocument();
    const imageButtons = screen.getAllByRole('button', { name: /bild vergrößern/i });
    expect(imageButtons).toHaveLength(3);
    expect(screen.getByText('+1')).toBeInTheDocument();
    await user.click(imageButtons[0]!);
    expect(screen.getByRole('dialog', { name: 'Bildansicht' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /alle projekte/i })).toHaveAttribute('href', '/work');
    expect(screen.queryByRole('link', { name: /vorheriges projekt/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /nächstes projekt/i })).toHaveAttribute(
      'href',
      '/work/qt-widgets-common-lib',
    );
  });

  it('links to the surrounding projects from the detail navigation', () => {
    renderProjectRoute('/work/qt-widgets-common-lib');

    expect(screen.getByRole('link', { name: /vorheriges projekt/i })).toHaveAttribute(
      'href',
      '/work/qt-log-viewer',
    );
    expect(screen.getByRole('link', { name: /nächstes projekt/i })).toHaveAttribute(
      'href',
      '/work/react-portfolio-web-app',
    );
  });

  it('copies the current project link and confirms the action', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    renderProjectRoute('/work/qt-log-viewer');

    await user.click(screen.getByRole('button', { name: /projektlink kopieren/i }));

    expect(writeText).toHaveBeenCalledWith(window.location.href);
    expect(screen.getByRole('button', { name: /projektlink kopiert/i })).toBeInTheDocument();
    expect(screen.getByTestId('copy-success-icon')).toBeInTheDocument();
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
