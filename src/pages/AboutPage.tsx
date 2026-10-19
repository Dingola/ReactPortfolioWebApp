import { Link } from 'react-router-dom';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { germanPortfolioContent } from '@/content/portfolio.de';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './AboutPage.module.css';

/** Presents the person and working principles behind the portfolio. */
export default function AboutPage() {
  const { translate } = useLocale();
  const { about, contactLinks } = germanPortfolioContent;
  const githubProfile = contactLinks.find((link) => link.kind === 'github');

  useDocumentTitle(`${translate('About')} · ${appConfig.name}`);

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
            <Link className={styles.primaryAction} to="/work">
              {translate('View projects')}
              <span aria-hidden="true">→</span>
            </Link>
            {githubProfile ? (
              <a
                className={styles.secondaryAction}
                href={githubProfile.href}
                rel="noreferrer"
                target="_blank"
              >
                {translate('View GitHub profile')}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </div>

        <figure className={styles.workspace}>
          <div className={styles.imageFrame}>
            <img
              src="/images/about/workplace.png"
              alt={translate("Adrian Helbig's workspace")}
              width="900"
              height="1200"
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
