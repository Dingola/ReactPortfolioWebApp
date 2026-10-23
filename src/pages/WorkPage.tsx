import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { ImageViewer } from '@/components/media/ImageViewer';
import type { PortfolioProject, ProjectCategory, PublicRepository } from '@/content/types';
import type { SourceMessage } from '@/i18n/messages';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './WorkPage.module.css';

type ProjectFilter = 'all' | ProjectCategory;

const availableFilters = [
  { id: 'all', label: 'All projects' },
  { id: 'tool', label: 'Tools' },
  { id: 'library', label: 'Libraries' },
  { id: 'web', label: 'Web applications' },
] as const satisfies readonly { readonly id: ProjectFilter; readonly label: SourceMessage }[];

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const { translate } = useLocale();
  const image = project.images[0];
  const sourceUrl = project.links?.repository ?? project.links?.repositories?.[0]?.href;

  return (
    <article className={styles.card}>
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
            <Link className={styles.titleLink} to={`/work/${project.slug}`}>
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
          <Link className={styles.detailLink} to={`/work/${project.slug}`}>
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
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
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

  useDocumentTitle(`${translate('Projects')} · ${appConfig.name}`);

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
                  checked={activeFilter === filter.id}
                  name="project-filter"
                  onChange={() => setActiveFilter(filter.id)}
                  type="radio"
                  value={filter.id}
                />
                <span>{translate(filter.label)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={styles.projectGrid} aria-live="polite">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={projects.findIndex((candidate) => candidate.id === project.id)}
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
