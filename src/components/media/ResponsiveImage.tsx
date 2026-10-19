import clsx from 'clsx';
import { useState, type ImgHTMLAttributes } from 'react';

import { useLocale } from '@/app/providers/locale/useLocale';

import styles from './ResponsiveImage.module.css';

export interface ResponsiveImageSource {
  readonly type: 'image/avif' | 'image/webp';
  readonly srcSet: string;
}

export interface ResponsiveImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'alt' | 'height' | 'onError' | 'onLoad' | 'src' | 'srcSet' | 'width'
> {
  readonly alt: string;
  readonly className?: string | undefined;
  readonly height: number;
  readonly sizes: string;
  readonly sources: readonly ResponsiveImageSource[];
  readonly src: string;
  readonly width: number;
}

/** Renders responsive image sources with stable loading and failure feedback. */
export function ResponsiveImage({
  alt,
  className,
  height,
  sizes,
  sources,
  src,
  width,
  ...imageProps
}: ResponsiveImageProps) {
  const { translate } = useLocale();
  const [imageState, setImageState] = useState<{
    readonly src: string;
    readonly status: 'loaded' | 'error';
  }>();
  const status = imageState?.src === src ? imageState.status : 'loading';

  return (
    <span
      className={clsx(styles.frame, className)}
      data-image-status={status}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <picture>
        {sources.map((source) => (
          <source key={source.type} sizes={sizes} srcSet={source.srcSet} type={source.type} />
        ))}
        <img
          {...imageProps}
          alt={alt}
          className={styles.image}
          height={height}
          onError={() => setImageState({ src, status: 'error' })}
          onLoad={() => setImageState({ src, status: 'loaded' })}
          src={src}
          width={width}
        />
      </picture>

      {status === 'loading' ? (
        <span className={styles.loading} aria-hidden="true">
          <span className={styles.indicator} />
        </span>
      ) : null}

      {status === 'error' ? (
        <span className={styles.error} role="status">
          {translate('Image could not be loaded.')}
        </span>
      ) : null}
    </span>
  );
}
