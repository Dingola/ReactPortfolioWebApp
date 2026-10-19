import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '@/test/test-utils';

import { ResponsiveImage } from './ResponsiveImage';

const imageProps = {
  alt: 'Application preview',
  height: 450,
  sizes: '(max-width: 40rem) 100vw, 40rem',
  sources: [
    {
      type: 'image/avif' as const,
      srcSet: '/preview-640.avif 640w, /preview-1280.avif 1280w',
    },
  ],
  src: '/preview.png',
  width: 800,
};

describe('ResponsiveImage', () => {
  it('provides responsive sources and preserves the image dimensions', () => {
    const { container } = renderWithProviders(<ResponsiveImage {...imageProps} loading="lazy" />);

    const image = screen.getByAltText('Application preview');
    const source = container.querySelector('source');

    expect(image).toHaveAttribute('width', '800');
    expect(image).toHaveAttribute('height', '450');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(source).toHaveAttribute('srcset', '/preview-640.avif 640w, /preview-1280.avif 1280w');
    expect(source).toHaveAttribute('sizes', imageProps.sizes);
  });

  it('moves from its loading state to the loaded state', () => {
    const { container } = renderWithProviders(<ResponsiveImage {...imageProps} />);

    const frame = container.querySelector('[data-image-status]');
    expect(frame).toHaveAttribute('data-image-status', 'loading');

    fireEvent.load(screen.getByAltText('Application preview'));

    expect(frame).toHaveAttribute('data-image-status', 'loaded');
  });

  it('shows localized feedback when the image cannot be loaded', () => {
    const { container } = renderWithProviders(<ResponsiveImage {...imageProps} />);

    fireEvent.error(screen.getByAltText('Application preview'));

    expect(container.querySelector('[data-image-status]')).toHaveAttribute(
      'data-image-status',
      'error',
    );
    expect(screen.getByRole('status')).toHaveTextContent('Bild konnte nicht geladen werden.');
  });
});
