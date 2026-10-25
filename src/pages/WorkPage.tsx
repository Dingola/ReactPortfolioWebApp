import { useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useReducedMotion } from 'motion/react';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { ImageViewer } from '@/components/media/ImageViewer';
import type { PortfolioProject, ProjectCategory, PublicRepository } from '@/content/types';
import type { SourceMessage } from '@/i18n/messages';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './WorkPage.module.css';

type ProjectFilter = 'all' | ProjectCategory;

type ProjectLinkClickHandler = (event: MouseEvent<HTMLAnchorElement>, projectId: string) => void;

const projectTransitionDuration = 320;
const filterExitDuration = 190;

const availableFilters = [
  { id: 'all', label: 'All projects' },
  { id: 'tool', label: 'Tools' },
  { id: 'library', label: 'Libraries' },
  { id: 'web', label: 'Web applications' },
] as const satisfies readonly { readonly id: ProjectFilter; readonly label: SourceMessage }[];

function getCenteredCardTransform(card: DOMRect, grid: DOMRect) {
  const horizontalDistance = grid.left + grid.width / 2 - (card.left + card.width / 2);
  const verticalDistance = grid.top + grid.height / 2 - (card.top + card.height / 2);
  const horizontalOffset = Math.max(-8, Math.min(8, horizontalDistance * 0.04));
  const verticalOffset = Math.max(-6, Math.min(6, verticalDistance * 0.03));
  const horizontalPosition =
    (card.left + card.width / 2 - (grid.left + grid.width / 2)) / grid.width;
  const verticalPosition =
    (card.top + card.height / 2 - (grid.top + grid.height / 2)) / grid.height;
  const rotateX = Math.max(-0.35, Math.min(0.35, verticalPosition * 0.8));
  const rotateY = Math.max(-0.5, Math.min(0.5, horizontalPosition * -1.1));

  return `translate3d(${horizontalOffset}px, ${verticalOffset}px, -0.25rem) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.985)`;
}

function getFilteredCardTransform(horizontalOffset = 0, verticalOffset = 0) {
  return `translate3d(${horizontalOffset}px, ${verticalOffset}px, 0) scale(0.98)`;
}

function getProjectCards(grid: HTMLDivElement) {
  return Array.from(grid.querySelectorAll<HTMLElement>('[data-project-card]'));
}

function getFollowingSections(grid: HTMLDivElement) {
  const sections: HTMLElement[] = [];
  let sibling = grid.nextElementSibling;

  while (sibling instanceof HTMLElement) {
    sections.push(sibling);
    sibling = sibling.nextElementSibling;
  }

  return sections;
}

function ProjectCard({
  project,
  index,
  onProjectLinkClick,
}: {
  project: PortfolioProject;
  index: number;
  onProjectLinkClick: ProjectLinkClickHandler;
}) {
  const { translate } = useLocale();
  const image = project.images[0];
  const sourceUrl = project.links?.repository ?? project.links?.repositories?.[0]?.href;

  return (
    <article className={styles.card} data-project-card={project.id}>
      <div className={styles.preview}>
        {image ? (
          <ImageViewer
            buttonClassName={styles.previewButton}
            className={styles.previewMedia}
            image={image}
            images={project.images}
            sizes="(max-width: 48rem) calc(100vw - 3rem), (max-width: 75rem) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className={styles.previewFallback} aria-label={translate('Project preview')}>
            <span className={styles.previewIndex}>{String(index + 1).padStart(2, '0')}</span>
            <strong className={styles.previewTitle}>{project.title}</strong>
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <p className={styles.projectNumber}>PROJECT_{String(index + 1).padStart(3, '0')}</p>
        <div className={styles.introduction}>
          <h2>
            <Link
              className={styles.titleLink}
              onClick={(event) => onProjectLinkClick(event, project.id)}
              to={`/work/${project.slug}`}
            >
              {project.title}
            </Link>
          </h2>
          <p className={styles.summary}>{project.summary}</p>
        </div>
        <ul className={styles.technologies} aria-label={translate('Technology stack')}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link
            className={styles.detailLink}
            onClick={(event) => onProjectLinkClick(event, project.id)}
            to={`/work/${project.slug}`}
          >
            {translate('View project')}
            <span aria-hidden="true">→</span>
          </Link>
          {sourceUrl ? (
            <a className={styles.sourceLink} href={sourceUrl} rel="noreferrer" target="_blank">
              {translate('Source code')}
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function CompactRepositoryGrid({ items }: { items: readonly PublicRepository[] }) {
  const { translate } = useLocale();

  return (
    <div className={styles.repositoryGrid}>
      {items.map((item) => (
        <article className={styles.repositoryItem} key={item.id}>
          <div>
            <h3>{item.title}</h3>
            <p className={styles.repositorySummary}>{item.summary}</p>
          </div>
          <ul className={styles.repositoryTechnologies} aria-label={translate('Technology stack')}>
            {item.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <a
            aria-label={`${item.title}: ${translate('View repository')}`}
            href={item.repository}
            rel="noreferrer"
            target="_blank"
          >
            {translate('View repository')}
            <span aria-hidden="true">↗</span>
          </a>
        </article>
      ))}
    </div>
  );
}

/** Renders the filterable overview of confirmed portfolio projects. */
export default function WorkPage() {
  const { content, translate } = useLocale();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion() ?? false;
  const projectGridRef = useRef<HTMLDivElement>(null);
  const isProjectTransitionRunning = useRef(false);
  const revealFilteredProjects = useRef(false);
  const previousFilterCardRects = useRef(new Map<string, DOMRect>());
  const previousFollowingSectionRects = useRef(new Map<HTMLElement, DOMRect>());
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const projects = content.projects;
  const visibleProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((project) =>
            project.categories.some((category) => category === activeFilter),
          ),
    [activeFilter, projects],
  );

  useDocumentTitle(`${translate('Projects')} · ${appConfig.siteName}`);

  useLayoutEffect(() => {
    const grid = projectGridRef.current;

    if (!grid || reduceMotion || typeof Element.prototype.animate !== 'function') {
      return;
    }

    const isFilterReveal = revealFilteredProjects.current;
    revealFilteredProjects.current = false;
    const gridBounds = grid.getBoundingClientRect();

    const cards = getProjectCards(grid);
    const animations = cards.map((card, index) => {
      const previousBounds = card.dataset.projectCard
        ? previousFilterCardRects.current.get(card.dataset.projectCard)
        : undefined;
      const currentBounds = card.getBoundingClientRect();
      const horizontalOffset = previousBounds ? previousBounds.left - currentBounds.left : 0;
      const verticalOffset = previousBounds ? previousBounds.top - currentBounds.top : 10;
      const initialTransform = previousBounds
        ? `translate3d(${horizontalOffset}px, ${verticalOffset}px, 0) scale(1)`
        : getFilteredCardTransform(0, verticalOffset);

      return card.animate(
        [
          {
            opacity: isFilterReveal ? (previousBounds ? 1 : 0.82) : 0.84,
            transform: isFilterReveal
              ? initialTransform
              : getCenteredCardTransform(currentBounds, gridBounds),
            transformOrigin: 'center center',
          },
          {
            opacity: 1,
            transform: 'translate3d(0, 0, 0) rotateX(0) rotateY(0) scale(1)',
            transformOrigin: 'center center',
          },
        ],
        {
          delay: index * (isFilterReveal ? 6 : 14),
          duration: isFilterReveal ? 400 : projectTransitionDuration + 50,
          easing: isFilterReveal
            ? 'cubic-bezier(0.22, 0.61, 0.36, 1)'
            : 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'both',
        },
      );
    });

    if (isFilterReveal) {
      const sectionAnimations = Array.from(previousFollowingSectionRects.current).map(
        ([section, previousBounds]) => {
          const verticalOffset = previousBounds.top - section.getBoundingClientRect().top;

          return section.animate(
            [
              { transform: `translate3d(0, ${verticalOffset}px, 0)` },
              { transform: 'translate3d(0, 0, 0)' },
            ],
            {
              duration: 400,
              easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
              fill: 'both',
            },
          );
        },
      );
      const transitionAnimations = [...animations, ...sectionAnimations];

      void Promise.allSettled(transitionAnimations.map((animation) => animation.finished)).then(
        () => {
          cards.forEach((card) => {
            card.style.removeProperty('opacity');
            card.style.removeProperty('transform');
            card.style.removeProperty('transform-origin');
            card.style.removeProperty('z-index');
          });
          transitionAnimations.forEach((animation) => animation.cancel());
          previousFilterCardRects.current.clear();
          previousFollowingSectionRects.current.clear();
          delete grid.dataset.transitioning;
          setIsFiltering(false);
        },
      );
    }

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, [activeFilter, projects, reduceMotion]);

  const handleFilterChange = (filter: ProjectFilter) => {
    if (filter === selectedFilter || isFiltering) {
      return;
    }

    setSelectedFilter(filter);

    const grid = projectGridRef.current;

    if (!grid || reduceMotion || typeof Element.prototype.animate !== 'function') {
      setActiveFilter(filter);
      return;
    }

    setIsFiltering(true);
    grid.dataset.transitioning = 'true';

    const cards = getProjectCards(grid);
    previousFilterCardRects.current = new Map(
      cards.flatMap((card) =>
        card.dataset.projectCard
          ? [[card.dataset.projectCard, card.getBoundingClientRect()] as const]
          : [],
      ),
    );
    previousFollowingSectionRects.current = new Map(
      getFollowingSections(grid).map((section) => [section, section.getBoundingClientRect()]),
    );
    const animations = cards.map((card, index) => {
      const project = projects.find((candidate) => candidate.id === card.dataset.projectCard);
      const remainsVisible =
        filter === 'all' || project?.categories.some((category) => category === filter) === true;
      card.style.zIndex = remainsVisible ? '2' : '1';

      return card.animate(
        [
          {
            opacity: 1,
            transform: 'translate3d(0, 0, 0) rotateX(0) rotateY(0) scale(1)',
            transformOrigin: 'center center',
          },
          {
            opacity: remainsVisible ? 1 : 0.76,
            transform: remainsVisible
              ? 'translate3d(0, 0, 0) scale(1)'
              : getFilteredCardTransform(0, 8),
            transformOrigin: 'center center',
          },
        ],
        {
          delay: index * 6,
          duration: filterExitDuration,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
        },
      );
    });

    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      animations.forEach((animation) => {
        animation.commitStyles();
        animation.cancel();
      });
      revealFilteredProjects.current = true;
      setActiveFilter(filter);
    });
  };

  const handleProjectLinkClick: ProjectLinkClickHandler = (event, projectId) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.defaultPrevented
    ) {
      return;
    }

    event.preventDefault();

    const destination = event.currentTarget.pathname;
    const grid = projectGridRef.current;

    if (
      !grid ||
      reduceMotion ||
      isProjectTransitionRunning.current ||
      typeof Element.prototype.animate !== 'function'
    ) {
      navigate(destination);
      return;
    }

    isProjectTransitionRunning.current = true;
    grid.dataset.transitioning = 'true';

    const gridBounds = grid.getBoundingClientRect();
    const animations = getProjectCards(grid).map((card) => {
      const isSelectedCard = card.dataset.projectCard === projectId;
      card.style.zIndex = isSelectedCard ? '2' : '1';

      return card.animate(
        [
          {
            opacity: 1,
            transform: 'translate3d(0, 0, 0) rotateX(0) rotateY(0) scale(1)',
          },
          {
            opacity: isSelectedCard ? 0.94 : 0.8,
            transform: getCenteredCardTransform(card.getBoundingClientRect(), gridBounds),
          },
        ],
        {
          duration: projectTransitionDuration,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
        },
      );
    });

    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      navigate(destination);
    });
  };

  return (
    <Container className={styles.page}>
      <div className={styles.overview}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>02 / {translate('Work')}</p>
          <h1>{translate('Projects')}</h1>
          <p>{translate('Selected software projects and the technologies behind them.')}</p>
        </header>

        <fieldset className={styles.filters}>
          <legend>{translate('Filter projects')}</legend>
          <div className={styles.filterOptions}>
            {availableFilters.map((filter) => (
              <label key={filter.id} className={styles.filter}>
                <input
                  checked={selectedFilter === filter.id}
                  disabled={isFiltering}
                  name="project-filter"
                  onChange={() => handleFilterChange(filter.id)}
                  type="radio"
                  value={filter.id}
                />
                <span>{translate(filter.label)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div
        className={styles.projectGrid}
        aria-busy={isFiltering}
        aria-live="polite"
        ref={projectGridRef}
      >
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={projects.findIndex((candidate) => candidate.id === project.id)}
            onProjectLinkClick={handleProjectLinkClick}
          />
        ))}
      </div>

      <section className={styles.repositorySection} aria-labelledby="public-repositories-heading">
        <header className={styles.repositoryHeader}>
          <p className={styles.eyebrow}>REPOSITORIES / 03</p>
          <h2 id="public-repositories-heading">{translate('More public repositories')}</h2>
          <p>{translate('Related public libraries that support my C++ and Qt projects.')}</p>
        </header>

        <CompactRepositoryGrid items={content.publicRepositories} />
      </section>

      <section className={styles.repositorySection} aria-labelledby="templates-heading">
        <header className={styles.repositoryHeader}>
          <p className={styles.eyebrow}>TEMPLATES / 04</p>
          <h2 id="templates-heading">{translate('Project foundations and templates')}</h2>
          <p>
            {translate(
              'Reusable foundations for consistent builds, tests, and continuous integration.',
            )}
          </p>
        </header>

        <CompactRepositoryGrid items={content.projectTemplates} />
      </section>
    </Container>
  );
}
