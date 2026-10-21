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
    expect(screen.getByRole('heading', { name: 'QtRecordParser' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'SimpleCppLogger & SimpleQtLogger' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Qt Widgets Common Library' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'React Portfolio Web App' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Qt Log Viewer' })).toHaveAttribute(
      'href',
      '/work/qt-log-viewer',
    );
    expect(screen.getAllByRole('link', { name: /quellcode/i })).toHaveLength(5);
    expect(screen.getAllByRole('link', { name: /projekt ansehen/i })).toHaveLength(5);
    expect(screen.getAllByRole('link', { name: /projekt ansehen/i })[0]).toHaveAttribute(
      'href',
      '/work/qt-log-viewer',
    );
    expect(screen.getAllByRole('button', { name: /bild vergrößern/i })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Weitere öffentliche Repositories' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /^QtQuickCommonLib: Repository ansehen$/i }),
    ).toHaveAttribute('href', 'https://github.com/Dingola/QtQuickCommonLib');
    expect(
      screen.getByRole('link', { name: /^QtCommonLib: Repository ansehen$/i }),
    ).toHaveAttribute('href', 'https://github.com/Dingola/QtCommonLib');
    expect(screen.getByRole('link', { name: /^CommonLib: Repository ansehen$/i })).toHaveAttribute(
      'href',
      'https://github.com/Dingola/CommonLib',
    );
    expect(
      screen.getByRole('heading', { level: 2, name: 'Projektgrundlagen und Templates' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /^ReactWebTemplate: Repository ansehen$/i }),
    ).toHaveAttribute('href', 'https://github.com/Dingola/ReactWebTemplate');
    expect(
      screen.getByRole('link', { name: /^QtWidgetsTemplate: Repository ansehen$/i }),
    ).toHaveAttribute('href', 'https://github.com/Dingola/QtWidgetsTemplate');
    expect(
      screen.getByRole('link', { name: /^QtQuickTemplate: Repository ansehen$/i }),
    ).toHaveAttribute('href', 'https://github.com/Dingola/QtQuickTemplate');
    expect(
      screen.getByRole('link', { name: /^CppTemplate: Repository ansehen$/i }),
    ).toHaveAttribute('href', 'https://github.com/Dingola/CppTemplate');
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
    expect(screen.queryByRole('heading', { name: 'QtRecordParser' })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Qt Widgets Common Library' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'React Portfolio Web App' }),
    ).not.toBeInTheDocument();
  });

  it('includes QtRecordParser in the library filter', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <MemoryRouter>
        <WorkPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('radio', { name: 'Bibliotheken' }));

    expect(screen.getByRole('heading', { name: 'QtRecordParser' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'SimpleCppLogger & SimpleQtLogger' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Qt Widgets Common Library' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Qt Log Viewer' })).not.toBeInTheDocument();
  });
});
