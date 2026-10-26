import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';

import { useLocale } from '@/app/providers/locale/useLocale';
import type { SourceMessage } from '@/i18n/messages';

import styles from './PageSectionNavigation.module.css';

/** One destination displayed by {@link PageSectionNavigation}. */
export interface PageSectionNavigationItem {
  /** ID of the section heading or section element used as the anchor target. */
  readonly id: string;
  /** Localizable label shown for the destination. */
  readonly label: SourceMessage;
}

/** Props accepted by {@link PageSectionNavigation}. */
export interface PageSectionNavigationProps {
  /** Ordered section destinations represented by the navigation. */
  readonly items: readonly PageSectionNavigationItem[];
  /** Localizable heading describing the navigation in its page context. */
  readonly title: SourceMessage;
}

interface NavigationStyle extends CSSProperties {
  '--page-progress': number;
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Provides reusable in-page orientation for long, structured pages. */
export function PageSectionNavigation({ items, title }: PageSectionNavigationProps) {
  const { translate } = useLocale();
  const [activeId, setActiveId] = useState(items[0]?.id);
  const navigationRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateNavigation = () => {
      const sections = items
        .map((item) => document.getElementById(item.id))
        .filter((section): section is HTMLElement => section !== null);

      if (sections.length === 0) {
        return;
      }

      const firstSection = sections[0];

      if (!firstSection) {
        return;
      }

      const readingLine = window.innerHeight * 0.32;
      const lastSection = sections.at(-1) ?? firstSection;
      const reachedPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const lastSectionIsProminent =
        lastSection.getBoundingClientRect().top <= window.innerHeight * 0.72;
      const currentSection =
        reachedPageEnd || lastSectionIsProminent
          ? lastSection
          : sections.reduce(
              (current, section) =>
                section.getBoundingClientRect().top <= readingLine ? section : current,
              firstSection,
            );
      const firstSectionTop = firstSection.getBoundingClientRect().top + window.scrollY;
      const lastSectionBottom = lastSection.getBoundingClientRect().bottom + window.scrollY;
      const progressRange = Math.max(
        lastSectionBottom - firstSectionTop - window.innerHeight * 0.5,
        1,
      );
      const nextProgress = clamp((window.scrollY + readingLine - firstSectionTop) / progressRange);

      setActiveId(currentSection.id);

      if (progressRef.current !== nextProgress) {
        progressRef.current = nextProgress;
        navigationRef.current?.style.setProperty('--page-progress', String(nextProgress));
      }
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateNavigation);
    };

    updateNavigation();
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('scroll', scheduleUpdate);
    };
  }, [items]);

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.pushState(window.history.state, '', `#${id}`);
    setActiveId(id);
  };

  return (
    <nav
      aria-label={translate('Page sections')}
      className={styles.navigation}
      ref={navigationRef}
      style={{ '--page-progress': 0 } as NavigationStyle}
    >
      <p className={styles.title}>{translate(title)}</p>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id} className={styles.item} data-active={isActive}>
              <a
                aria-current={isActive ? 'location' : undefined}
                href={`#${item.id}`}
                onClick={(event) => navigateToSection(event, item.id)}
              >
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.label}>{translate(item.label)}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
