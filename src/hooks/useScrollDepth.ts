import { useEffect } from 'react';

const scrollDepthSelector = '[data-scroll-depth]';
const scrollLineSelector = '[data-scroll-line]';

/** Coordinates scroll-driven depth and accent progress for selected surfaces. */
export function useScrollDepth() {
  useEffect(() => {
    const mainContent = document.getElementById('main-content');

    if (!mainContent) {
      return;
    }

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let elements: HTMLElement[] = [];
    let lineElements: HTMLElement[] = [];
    let animationFrame = 0;

    const updateDepth = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      const viewportCentre = viewportHeight / 2;
      const compactViewport = window.innerWidth <= 768;

      for (const element of elements) {
        if (motionPreference.matches) {
          element.style.removeProperty('--scroll-depth-opacity');
          element.style.removeProperty('--scroll-depth-scale');
          continue;
        }

        const bounds = element.getBoundingClientRect();
        const elementCentre = bounds.top + bounds.height / 2;
        const focusRange = viewportHeight * 0.72 + bounds.height * 0.15;
        const linearFocus = 1 - Math.min(1, Math.abs(elementCentre - viewportCentre) / focusRange);
        const focus = linearFocus * linearFocus * (3 - 2 * linearFocus);
        const strongEffect = element.dataset.scrollDepth === 'strong';
        const minimumScale = compactViewport
          ? strongEffect
            ? 0.95
            : 0.98
          : strongEffect
            ? 0.9
            : 0.95;
        const maximumScale = 1;
        const minimumOpacity = compactViewport
          ? strongEffect
            ? 0.92
            : 0.97
          : strongEffect
            ? 0.8
            : 0.9;

        element.style.setProperty(
          '--scroll-depth-scale',
          String(minimumScale + (maximumScale - minimumScale) * focus),
        );
        element.style.setProperty(
          '--scroll-depth-opacity',
          String(minimumOpacity + (1 - minimumOpacity) * focus),
        );
      }

      for (const element of lineElements) {
        if (motionPreference.matches) {
          element.style.removeProperty('--scroll-line-scale');
          continue;
        }

        const linearProgress = Math.min(1, Math.max(0, window.scrollY / (viewportHeight * 0.55)));
        const progress = linearProgress * linearProgress * (3 - 2 * linearProgress);

        element.style.setProperty('--scroll-line-scale', String(0.15 + progress * 0.85));
      }
    };

    const requestDepthUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateDepth);
      }
    };

    const collectElements = () => {
      elements = Array.from(mainContent.querySelectorAll<HTMLElement>(scrollDepthSelector));
      lineElements = Array.from(mainContent.querySelectorAll<HTMLElement>(scrollLineSelector));
      requestDepthUpdate();
    };

    const observer = new MutationObserver(collectElements);
    observer.observe(mainContent, { childList: true, subtree: true });
    collectElements();

    window.addEventListener('scroll', requestDepthUpdate, { passive: true });
    window.addEventListener('resize', requestDepthUpdate);
    motionPreference.addEventListener('change', requestDepthUpdate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestDepthUpdate);
      window.removeEventListener('resize', requestDepthUpdate);
      motionPreference.removeEventListener('change', requestDepthUpdate);
    };
  }, []);
}
