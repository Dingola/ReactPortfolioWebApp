import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { act, fireEvent, renderWithProviders, screen } from '@/test/test-utils';

import { ImageViewer, type ImageViewerImage } from './ImageViewer';

const images: readonly ImageViewerImage[] = [
  {
    src: '/first.png',
    alt: 'First project view',
    caption: 'First caption',
    width: 1600,
    height: 900,
  },
  {
    src: '/second.png',
    alt: 'Second project view',
    caption: 'Second caption',
    width: 1600,
    height: 900,
  },
];

afterEach(() => vi.useRealTimers());

describe('ImageViewer', () => {
  it('opens, navigates by keyboard, and restores focus after closing', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ImageViewer image={images[0]!} images={images} initialIndex={0} sizes="100vw" />,
    );

    const trigger = screen.getByRole('button', {
      name: 'Bild vergrößern: First project view',
    });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Bildansicht' });
    expect(dialog).toHaveFocus();
    expect(document.body).toHaveStyle({ overflow: 'hidden' });
    expect(screen.getByText('Bild 1 / 2')).toBeInTheDocument();

    await user.keyboard('{ArrowRight}');

    expect(screen.getByText('Bild 1 / 2')).toBeInTheDocument();
    fireEvent.load(screen.getByAltText('Second project view'));

    expect(screen.getByText('Bild 2 / 2')).toBeInTheDocument();
    expect(screen.getByText('Second caption')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Second project view' })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' });
    expect(trigger).toHaveFocus();
  });

  it('omits navigation controls for a single image', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ImageViewer image={images[0]!} sizes="100vw" />);

    await user.click(screen.getByRole('button', { name: /bild vergrößern/i }));

    expect(screen.queryByRole('button', { name: 'Vorheriges Bild' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Nächstes Bild' })).not.toBeInTheDocument();
  });

  it('closes when the surrounding backdrop is selected', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ImageViewer image={images[0]!} sizes="100vw" />);

    await user.click(screen.getByRole('button', { name: /bild vergrößern/i }));
    await user.click(screen.getAllByRole('button', { name: 'Bildansicht schließen' })[0]!);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('hides pointer controls after the pointer remains still', () => {
    vi.useFakeTimers();
    renderWithProviders(<ImageViewer image={images[0]!} images={images} sizes="100vw" />);

    fireEvent.click(screen.getByRole('button', { name: /bild vergrößern/i }));
    const figure = screen.getByRole('figure');
    fireEvent.pointerMove(figure);
    expect(figure).toHaveAttribute('data-controls-visible', 'true');

    act(() => vi.advanceTimersByTime(1800));

    expect(figure).not.toHaveAttribute('data-controls-visible');

    const nextButton = screen.getByRole('button', { name: 'Nächstes Bild' });
    fireEvent.pointerEnter(nextButton);
    act(() => vi.advanceTimersByTime(3000));
    expect(figure).toHaveAttribute('data-controls-visible', 'true');

    fireEvent.pointerLeave(nextButton);
    act(() => vi.advanceTimersByTime(1800));
    expect(figure).not.toHaveAttribute('data-controls-visible');
    vi.useRealTimers();
  });
});
