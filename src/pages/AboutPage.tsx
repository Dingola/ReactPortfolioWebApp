import { Link } from 'react-router-dom';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { ImageViewer } from '@/components/media/ImageViewer';
import { SocialLinks } from '@/components/navigation/SocialLinks';
import buttonStyles from '@/components/ui/Button.module.css';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './AboutPage.module.css';

const workspaceSources = [
  {
    type: 'image/webp',
    srcSet: '/images/about/workplace-450.webp 450w, /images/about/workplace-900.webp 900w',
  },
] as const;

/** Presents the person and working principles behind the portfolio. */
export default function AboutPage() {
  const { content, translate } = useLocale();
  const { about } = content;

  useDocumentTitle(`${translate('About')} · ${appConfig.siteName}`);

  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>04 / {translate('About')}</p>
        <h1>{translate('About')}</h1>
        <p>{translate('How I approach software development.')}</p>
      </header>

      <section className={styles.introduction} aria-labelledby="about-statement">
        <div className={styles.copy}>
          <h2 id="about-statement">{about.statement}</h2>
          <div className={styles.paragraphs}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.actions}>
            <Link
              className={`${buttonStyles.button} ${buttonStyles.action} ${buttonStyles.primary}`}
              to="/work"
            >
              <span className={buttonStyles.content}>
                {translate('View projects')}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
            <SocialLinks showLabels />
          </div>
        </div>

        <figure className={styles.workspace}>
          <div className={styles.imageFrame}>
            <ImageViewer
              className={styles.workspaceMedia}
              image={{
                src: '/images/about/workplace.png',
                sources: workspaceSources,
                alt: translate("Adrian Helbig's workspace"),
                caption: translate('My workspace'),
                width: 900,
                height: 1200,
              }}
              sizes="(max-width: 48rem) 82vw, 24rem"
              loading="lazy"
            />
          </div>
          <figcaption>
            <span aria-hidden="true">// </span>
            {translate('My workspace')}
          </figcaption>
        </figure>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>01 — 04</p>
          <h2 id="principles-title">{translate('Working principles')}</h2>
        </div>
        <ol>
          {about.workingPrinciples.map((principle, index) => (
            <li key={principle.id}>
              <span className={styles.principleIndex}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{principle.title}</h3>
                <p className={styles.principleDescription}>{principle.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
