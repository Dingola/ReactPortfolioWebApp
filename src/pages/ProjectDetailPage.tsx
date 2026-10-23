import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { ImageViewer } from '@/components/media/ImageViewer';
import { getProjectBySlug } from '@/content/portfolio';
import type { ProjectDetails } from '@/content/types';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import type { SourceMessage } from '@/i18n/messages';

import NotFoundPage from './NotFoundPage';
import styles from './ProjectDetailPage.module.css';

interface DetailListProps {
  readonly heading: SourceMessage;
  readonly items: readonly string[] | undefined;
}

function DetailList({ heading, items }: DetailListProps) {
  const { translate } = useLocale();

  if (!items?.length) {
    return null;
  }

  return (
    <section className={styles.listSection}>
      <h2>{translate(heading)}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function ProjectNarrative({ details }: { readonly details: ProjectDetails }) {
  const { translate } = useLocale();

  return (
    <div className={styles.narrative}>
      <section>
        <p className={styles.sectionLabel}>{translate('Project goal')}</p>
        <p>{details.goal}</p>
      </section>
      <section>
        <p className={styles.sectionLabel}>{translate('Starting point')}</p>
        <p>{details.problem}</p>
      </section>
      <section className={styles.solution}>
        <p className={styles.sectionLabel}>{translate('Solution')}</p>
        <p>{details.solution}</p>
      </section>
    </div>
  );
}

/** Renders the structured detail view for a portfolio project route. */
export default function ProjectDetailPage() {
  const { content, translate } = useLocale();
  const { slug = '' } = useParams();
  const location = useLocation();
  const project = getProjectBySlug(content, slug);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const copyResetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduceMotion = useReducedMotion() ?? false;
  const transitionDirection = (location.state as { projectDirection?: string } | null)
    ?.projectDirection;
  const detailDirection =
    transitionDirection === 'forward' ? 1 : transitionDirection === 'backward' ? -1 : 0;

  useEffect(
    () => () => {
      if (copyResetTimer.current) {
        clearTimeout(copyResetTimer.current);
      }
    },
    [],
  );

  useDocumentTitle(
    project
      ? `${project.title} · ${appConfig.name}`
      : `${translate('Page not found')} · ${appConfig.name}`,
  );

  if (!project) {
    return <NotFoundPage />;
  }

  const { details, images, links } = project;
  const projectIndex = content.projects.findIndex((candidate) => candidate.id === project.id);
  const previousProject = content.projects[projectIndex - 1];
  const nextProject = content.projects[projectIndex + 1];
  const previewImages = images.slice(1, 3);
  const hiddenImageCount = Math.max(0, images.length - 3);

  async function copyProjectLink() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API is not available.');
      }

      await navigator.clipboard.writeText(window.location.href);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }

    if (copyResetTimer.current) {
      clearTimeout(copyResetTimer.current);
    }

    copyResetTimer.current = setTimeout(() => setCopyState('idle'), 2500);
  }

  return (
    <Container className={styles.page}>
      <div className={styles.navigationBlock}>
        <nav className={styles.projectNavigation} aria-label={translate('Project navigation')}>
          <Link className={styles.overviewLink} to="/work">
            <svg aria-hidden="true" viewBox="0 0 16 16">
              <rect x="1" y="1" width="5" height="5" />
              <rect x="10" y="1" width="5" height="5" />
              <rect x="1" y="10" width="5" height="5" />
              <rect x="10" y="10" width="5" height="5" />
            </svg>
            {translate('All projects')}
          </Link>

          <div className={styles.navigationActions}>
            {previousProject ? (
              <Link
                className={`${styles.navigationLink} ${styles.previousLink}`}
                to={`/work/${previousProject.slug}`}
                state={{ projectDirection: 'backward' }}
                aria-label={`${translate('Previous project')}: ${previousProject.title}`}
              >
                <span aria-hidden="true">←</span>
                {translate('Previous project')}
              </Link>
            ) : null}

            {nextProject ? (
              <Link
                className={`${styles.navigationLink} ${styles.nextLink}`}
                to={`/work/${nextProject.slug}`}
                state={{ projectDirection: 'forward' }}
                aria-label={`${translate('Next project')}: ${nextProject.title}`}
              >
                {translate('Next project')}
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </nav>
      </div>

      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={project.slug}
          animate={{ opacity: 1, x: 0 }}
          className={styles.projectContent}
          exit={{ opacity: reduceMotion ? 1 : 0, transition: { duration: 0 } }}
          initial={{
            opacity: reduceMotion ? 1 : 0,
            x: reduceMotion ? 0 : detailDirection * 64,
          }}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.2, 0, 0, 1] }}
        >
          <button className={styles.copyButton} type="button" onClick={copyProjectLink}>
            {copyState === 'copied' ? (
              <svg aria-hidden="true" data-testid="copy-success-icon" viewBox="0 0 18 18">
                <path d="m3 9.25 3.5 3.5L15 4.75" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 18 18">
                <path d="M6.5 5.5V3.75A1.75 1.75 0 0 1 8.25 2h6A1.75 1.75 0 0 1 16 3.75v6a1.75 1.75 0 0 1-1.75 1.75H12.5" />
                <rect x="2" y="6.5" width="9.5" height="9.5" rx="1.75" />
              </svg>
            )}
            <span aria-live="polite">
              {copyState === 'copied'
                ? translate('Project link copied')
                : copyState === 'error'
                  ? translate('Project link could not be copied')
                  : translate('Copy project link')}
            </span>
          </button>

          <header className={styles.header}>
            <div className={styles.heading}>
              <p className={styles.eyebrow}>02 / {translate('Work')}</p>
              <h1>{project.title}</h1>
              <p className={styles.summary}>{project.summary}</p>
            </div>

            <aside className={styles.meta} aria-label={translate('Technology stack')}>
              <p className={styles.sectionLabel}>{translate('Technology stack')}</p>
              <ul className={styles.technologies}>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              {links ? (
                <div className={styles.links}>
                  {links.repository ? (
                    <a href={links.repository} rel="noreferrer" target="_blank">
                      {translate('Repository')} <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {links.repositories?.map((repository) => (
                    <a
                      href={repository.href}
                      key={repository.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {repository.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                  {links.documentation ? (
                    <a href={links.documentation} rel="noreferrer" target="_blank">
                      {translate('Documentation')} <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {links.live ? (
                    <a href={links.live} rel="noreferrer" target="_blank">
                      {translate('Live website')} <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </aside>
          </header>

          {images[0] ? (
            <section
              className={`${styles.mediaOverview} ${images.length === 1 ? styles.singleMedia : ''}`}
              aria-label={translate('Project screenshots')}
            >
              <figure className={styles.mainMedia}>
                <ImageViewer
                  buttonClassName={styles.mediaButton}
                  className={styles.mediaImage}
                  image={images[0]}
                  images={images}
                  sizes="(max-width: 64rem) calc(100vw - 2rem), 68vw"
                />
                {images[0].caption ? <figcaption>{images[0].caption}</figcaption> : null}
              </figure>

              {images.length > 1 ? (
                <div className={styles.previewGrid}>
                  {previewImages.map((image, index) => (
                    <figure className={styles.preview} key={image.src}>
                      <ImageViewer
                        buttonClassName={styles.mediaButton}
                        className={styles.mediaImage}
                        image={image}
                        images={images}
                        initialIndex={index + 1}
                        sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 64rem) 50vw, 33vw"
                        loading="lazy"
                      />
                      {index === previewImages.length - 1 && hiddenImageCount > 0 ? (
                        <span className={styles.remainingImages} aria-hidden="true">
                          +{hiddenImageCount}
                        </span>
                      ) : null}
                    </figure>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {details ? (
            <>
              <ProjectNarrative details={details} />
              <div className={styles.detailGrid}>
                <DetailList heading="Key features" items={details.features} />
                <DetailList heading="Technical decisions" items={details.technicalDecisions} />
                <DetailList heading="Quality assurance" items={details.qualityAssurance} />
              </div>
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
