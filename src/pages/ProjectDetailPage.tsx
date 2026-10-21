import { Link, useParams } from 'react-router-dom';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { ImageViewer } from '@/components/media/ImageViewer';
import { getProjectBySlug } from '@/content/portfolio';
import { germanPortfolioContent } from '@/content/portfolio.de';
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
  const { translate } = useLocale();
  const { slug = '' } = useParams();
  const project = getProjectBySlug(germanPortfolioContent, slug);

  useDocumentTitle(
    project
      ? `${project.title} · ${appConfig.name}`
      : `${translate('Page not found')} · ${appConfig.name}`,
  );

  if (!project) {
    return <NotFoundPage />;
  }

  const { details, images, links } = project;

  return (
    <Container className={styles.page}>
      <Link className={styles.backLink} to="/work">
        <span aria-hidden="true">←</span>
        {translate('Back to projects')}
      </Link>

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
        <figure className={styles.heroImage}>
          <ImageViewer
            image={images[0]}
            images={images}
            sizes="(max-width: 92rem) calc(100vw - 2rem), 92rem"
          />
          {images[0].caption ? <figcaption>{images[0].caption}</figcaption> : null}
        </figure>
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

      {images.length > 1 ? (
        <section className={styles.gallery}>
          <h2>{translate('Project screenshots')}</h2>
          <div className={styles.galleryGrid}>
            {images.slice(1).map((image, index) => (
              <figure key={image.src}>
                <ImageViewer
                  image={image}
                  images={images}
                  initialIndex={index + 1}
                  sizes="(max-width: 48rem) calc(100vw - 2rem), 50vw"
                  loading="lazy"
                />
                {image.caption ? <figcaption>{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
