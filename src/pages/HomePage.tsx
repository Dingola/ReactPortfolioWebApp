import { Link } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { germanPortfolioContent } from '@/content/portfolio.de';

import styles from './HomePage.module.css';

const technologyStack = [
  'C++20',
  'Qt 6',
  'CMake',
  'GoogleTest',
  'GitHub Actions',
  'Docker',
] as const;

/** Renders the portfolio landing page. */
export default function HomePage() {
  const { translate } = useLocale();
  const { profile, projects } = germanPortfolioContent;
  const featuredProject = projects.find((project) => project.id === 'qt-log-viewer');

  if (!featuredProject) {
    throw new Error('The featured Qt Log Viewer project is missing from the portfolio content.');
  }

  const featuredImage = featuredProject.images[0];

  if (!featuredImage) {
    throw new Error('The featured Qt Log Viewer project requires a preview image.');
  }

  useDocumentTitle(`${profile.name} · ${profile.role}`);

  return (
    <Container className={styles.home}>
      <div className={styles.introScreen}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroComposition}>
            <div className={styles.introduction}>
              <p className={styles.eyebrow}>
                <span aria-hidden="true">// </span>
                {translate('C++ · Qt · Desktop applications')}
              </p>

              <h1 id="home-title">
                <span className={styles.greeting}>{translate("Hi, I'm")}</span> {profile.name}
              </h1>
              <p className={styles.role}>{profile.role}</p>
              <p className={styles.summary}>{profile.introduction}</p>
              <div className={styles.actions}>
                <Link className={styles.primaryAction} to="/work">
                  {translate('View projects')}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link className={styles.secondaryAction} to="/contact">
                  {translate('Get in touch')}
                </Link>
              </div>
            </div>

            <figure className={styles.portrait}>
              <img
                src="/images/profile/adrian-helbig.png"
                alt={translate('Portrait of Adrian Helbig')}
                width="896"
                height="1111"
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <section className={styles.stack} aria-labelledby="technology-stack-title">
          <h2 id="technology-stack-title">{translate('Technology stack')}</h2>
          <ul>
            {technologyStack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className={styles.featuredProject} aria-labelledby="featured-project-title">
        <div className={styles.projectContent}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true">01 / </span>
            {translate('A look at my work')}
          </p>
          <h2 id="featured-project-title">{featuredProject.title}</h2>
          <p>{featuredProject.summary}</p>
          <ul className={styles.projectTechnologies} aria-label={translate('Technology stack')}>
            {featuredProject.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <Link className={styles.projectLink} to="/work">
            {translate('View project')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className={styles.projectImage}>
          <img
            src={featuredImage.src}
            alt={featuredImage.alt}
            width={featuredImage.width}
            height={featuredImage.height}
            loading="lazy"
          />
        </figure>
      </section>
    </Container>
  );
}
