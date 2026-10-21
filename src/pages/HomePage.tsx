import { Link } from 'react-router-dom';
import { preload } from 'react-dom';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { ImageViewer } from '@/components/media/ImageViewer';
import { SocialLinks } from '@/components/navigation/SocialLinks';
import buttonStyles from '@/components/ui/Button.module.css';
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

const portraitSources = [
  {
    type: 'image/webp',
    srcSet:
      '/images/profile/adrian-helbig-448.webp 448w, /images/profile/adrian-helbig-896.webp 896w',
  },
] as const;
const portraitSizes = '(max-width: 56rem) 30vw, 15rem';

preload('/images/profile/adrian-helbig-896.webp', {
  as: 'image',
  fetchPriority: 'high',
  imageSizes: portraitSizes,
  imageSrcSet: portraitSources[0].srcSet,
  type: 'image/webp',
});

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
                <Link
                  className={`${buttonStyles.button} ${buttonStyles.action} ${buttonStyles.primary}`}
                  to="/work"
                >
                  <span className={buttonStyles.content}>
                    {translate('View projects')}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
                <Link
                  className={`${buttonStyles.button} ${buttonStyles.action} ${buttonStyles.secondary}`}
                  to="/contact"
                >
                  <span className={buttonStyles.content}>{translate('Get in touch')}</span>
                </Link>
              </div>
              <SocialLinks className={styles.socialLinks} showLabels />
            </div>

            <figure className={styles.portrait}>
              <ImageViewer
                buttonClassName={styles.portraitButton}
                className={styles.portraitMedia}
                image={{
                  src: '/images/profile/adrian-helbig.png',
                  sources: portraitSources,
                  alt: translate('Portrait of Adrian Helbig'),
                  width: 896,
                  height: 1111,
                }}
                sizes={portraitSizes}
                loading="eager"
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
          <Link className={styles.projectLink} to={`/work/${featuredProject.slug}`}>
            {translate('View project')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className={styles.projectImage}>
          <ImageViewer
            className={styles.projectMedia}
            image={featuredImage}
            images={featuredProject.images}
            sizes="(max-width: 64rem) calc(100vw - 3rem), 60vw"
            loading="lazy"
          />
        </figure>
      </section>
    </Container>
  );
}
