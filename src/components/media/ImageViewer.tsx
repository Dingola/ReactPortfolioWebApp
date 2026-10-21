import clsx from 'clsx';
import {
  useEffect,
  useId,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';

import { useLocale } from '@/app/providers/locale/useLocale';

import { ResponsiveImage, type ResponsiveImageSource } from './ResponsiveImage';
import styles from './ImageViewer.module.css';

export interface ImageViewerImage {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly width: number;
  readonly height: number;
  readonly sources?: readonly ResponsiveImageSource[];
}

export interface ImageViewerProps {
  readonly buttonClassName?: string | undefined;
  readonly className?: string | undefined;
  readonly fetchPriority?: 'auto' | 'high' | 'low' | undefined;
  readonly image: ImageViewerImage;
  readonly images?: readonly ImageViewerImage[] | undefined;
  readonly initialIndex?: number | undefined;
  readonly loading?: 'eager' | 'lazy' | undefined;
  readonly sizes: string;
}

interface ImageViewerDialogProps {
  readonly images: readonly ImageViewerImage[];
  readonly initialIndex: number;
  /** Closes the viewer and returns control to the surrounding page. */
  readonly onClose: () => void;
  readonly returnFocusRef: RefObject<HTMLElement | null>;
}

function ImageViewerDialog({
  images,
  initialIndex,
  onClose,
  returnFocusRef,
}: ImageViewerDialogProps) {
  const { translate } = useLocale();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [controlsVisible, setControlsVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<number | undefined>(undefined);
  const isPointerOverControlRef = useRef(false);
  const loadedImagesRef = useRef<boolean[]>([]);
  const pendingImageIndexRef = useRef<number | undefined>(undefined);
  const captionId = useId();
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  const requestImage = useCallback((index: number) => {
    if (loadedImagesRef.current[index]) {
      setActiveIndex(index);
      pendingImageIndexRef.current = undefined;
    } else {
      pendingImageIndexRef.current = index;
    }
  }, []);

  useEffect(() => {
    const focusTarget = returnFocusRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      focusTarget?.focus();
    };
  }, [returnFocusRef]);

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (hasMultipleImages && event.key === 'ArrowLeft') {
        event.preventDefault();
        requestImage((activeIndex - 1 + images.length) % images.length);
      } else if (hasMultipleImages && event.key === 'ArrowRight') {
        event.preventDefault();
        requestImage((activeIndex + 1) % images.length);
      } else if (event.key === 'Tab') {
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button');
        if (!focusableElements?.length) {
          return;
        }

        const firstElement = focusableElements.item(0);
        const lastElement = focusableElements.item(focusableElements.length - 1);
        if (event.shiftKey && document.activeElement === dialogRef.current) {
          event.preventDefault();
          lastElement.focus();
        } else if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, hasMultipleImages, images.length, onClose, requestImage]);

  useEffect(
    () => () => {
      if (controlsTimerRef.current !== undefined) {
        window.clearTimeout(controlsTimerRef.current);
      }
    },
    [],
  );

  function keepControlsVisible() {
    setControlsVisible(true);
    if (controlsTimerRef.current !== undefined) {
      window.clearTimeout(controlsTimerRef.current);
    }
  }

  function showControls() {
    keepControlsVisible();
    if (isPointerOverControlRef.current) {
      return;
    }
    controlsTimerRef.current = window.setTimeout(() => setControlsVisible(false), 1800);
  }

  function hideControls() {
    if (controlsTimerRef.current !== undefined) {
      window.clearTimeout(controlsTimerRef.current);
    }
    setControlsVisible(false);
  }

  function handleControlPointerEnter() {
    isPointerOverControlRef.current = true;
    keepControlsVisible();
  }

  function handleControlPointerLeave() {
    isPointerOverControlRef.current = false;
    showControls();
  }

  function changeImage(offset: number, event: MouseEvent<HTMLButtonElement>) {
    requestImage((activeIndex + offset + images.length) % images.length);
    if (event.detail > 0) {
      event.currentTarget.blur();
    }
    showControls();
  }

  function handleImageLoad(index: number) {
    loadedImagesRef.current[index] = true;
    if (pendingImageIndexRef.current === index) {
      pendingImageIndexRef.current = undefined;
      setActiveIndex(index);
    }
  }

  if (!activeImage) {
    return null;
  }

  const mediaStyle: CSSProperties = {
    width: `min(96vw, ${((activeImage.width / activeImage.height) * 88).toFixed(3)}dvh)`,
    aspectRatio: `${activeImage.width} / ${activeImage.height}`,
  };

  return createPortal(
    <div className={styles.overlay}>
      <button
        className={styles.backdrop}
        type="button"
        aria-label={translate('Close image viewer')}
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-label={translate('Image viewer')}
        aria-modal="true"
        tabIndex={-1}
      >
        <figure
          className={clsx(styles.media, controlsVisible && styles.controlsVisible)}
          style={mediaStyle}
          aria-describedby={captionId}
          data-controls-visible={controlsVisible || undefined}
          onPointerEnter={showControls}
          onPointerMove={showControls}
          onPointerLeave={hideControls}
        >
          {images.map((image, index) => (
            <ResponsiveImage
              key={image.src}
              className={clsx(styles.imageFrame, index === activeIndex && styles.activeImageFrame)}
              src={image.src}
              sources={image.sources ?? []}
              sizes="96vw"
              alt={image.alt}
              width={image.width}
              height={image.height}
              aria-hidden={index !== activeIndex}
              onLoad={() => handleImageLoad(index)}
            />
          ))}

          <button
            className={clsx(styles.control, styles.closeButton)}
            type="button"
            aria-label={translate('Close image viewer')}
            onPointerEnter={handleControlPointerEnter}
            onPointerLeave={handleControlPointerLeave}
            onClick={onClose}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
              <path d="M6.75 6.75 17.25 17.25M17.25 6.75 6.75 17.25" />
            </svg>
          </button>

          {hasMultipleImages ? (
            <>
              <button
                className={clsx(styles.control, styles.previousButton)}
                type="button"
                aria-label={translate('Previous image')}
                onPointerEnter={handleControlPointerEnter}
                onPointerLeave={handleControlPointerLeave}
                onClick={(event) => changeImage(-1, event)}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                  <path d="m10.5 6-6 6 6 6M5 12h14.5" />
                </svg>
              </button>
              <button
                className={clsx(styles.control, styles.nextButton)}
                type="button"
                aria-label={translate('Next image')}
                onPointerEnter={handleControlPointerEnter}
                onPointerLeave={handleControlPointerLeave}
                onClick={(event) => changeImage(1, event)}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                  <path d="m13.5 6 6 6-6 6M19 12H4.5" />
                </svg>
              </button>
            </>
          ) : null}

          <figcaption id={captionId} className={styles.caption}>
            <span>{activeImage.caption ?? activeImage.alt}</span>
            <span className={styles.position} aria-live="polite">
              {translate('Image')} {activeIndex + 1} / {images.length}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>,
    document.body,
  );
}

/** Renders a responsive image with its keyboard-accessible large-scale viewer. */
export function ImageViewer({
  buttonClassName,
  className,
  fetchPriority,
  image,
  images = [image],
  initialIndex = 0,
  loading,
  sizes,
}: ImageViewerProps) {
  const { translate } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={triggerRef}
        className={clsx(styles.trigger, buttonClassName)}
        type="button"
        aria-label={`${translate('Open image viewer')}: ${image.alt}`}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        <ResponsiveImage
          className={className}
          src={image.src}
          sources={image.sources ?? []}
          sizes={sizes}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={loading}
          fetchPriority={fetchPriority}
        />
      </button>

      {isOpen ? (
        <ImageViewerDialog
          images={images}
          initialIndex={initialIndex}
          returnFocusRef={triggerRef}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </>
  );
}
