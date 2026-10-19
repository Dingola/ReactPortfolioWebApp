import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { germanPortfolioContent } from '@/content/portfolio.de';
import type { ContentDetail } from '@/content/types';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './ResumePage.module.css';

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { month: '2-digit', year: 'numeric' }).format(
    new Date(`${value}-01T00:00:00`),
  );
}

function Period({ start, end }: { readonly start: string; readonly end?: string }) {
  const { locale } = useLocale();

  return (
    <p className={styles.period}>
      <time dateTime={start}>{formatDate(start, locale)}</time>
      <span aria-hidden="true"> — </span>
      {end ? <time dateTime={end}>{formatDate(end, locale)}</time> : null}
    </p>
  );
}

function DetailList({ details }: { readonly details: readonly ContentDetail[] }) {
  if (details.length === 0) {
    return null;
  }

  return (
    <ul className={styles.details}>
      {details.map((detail) => (
        <li key={detail.text}>
          <span>{detail.text}</span>
          {detail.link ? (
            <a href={detail.link.href} rel="noreferrer" target="_blank">
              {detail.link.label}
              <span aria-hidden="true"> ↗</span>
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/** Renders the professional history, education, and skill overview. */
export default function ResumePage() {
  const { translate } = useLocale();
  const { experience, education, skillGroups } = germanPortfolioContent;

  useDocumentTitle(`${translate('Resume')} · ${appConfig.name}`);

  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>03 / {translate('Resume')}</p>
        <h1>{translate('Resume')}</h1>
        <p>{translate('Career history, education, and technical expertise.')}</p>
      </header>

      <section className={styles.section} aria-labelledby="experience-title">
        <h2 id="experience-title">{translate('Professional experience')}</h2>
        <div className={styles.timeline}>
          {experience.map((entry) => (
            <article key={entry.id} className={styles.entry}>
              <div className={styles.entryPeriod}>
                <Period end={entry.endDate} start={entry.startDate} />
              </div>
              <div className={styles.entryContent}>
                <h3>{entry.role}</h3>
                <a
                  className={styles.organisation}
                  href={entry.organisationUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {entry.organisation}
                  <span aria-hidden="true"> ↗</span>
                  <span className="visually-hidden">
                    {' '}
                    – {translate('Visit organisation website')}
                  </span>
                </a>
                {'description' in entry && entry.description ? (
                  <p className={styles.description}>{entry.description}</p>
                ) : null}
                <DetailList details={entry.highlights} />
                {entry.technologies.length > 0 ? (
                  <ul className={styles.technologies} aria-label={translate('Technology stack')}>
                    {entry.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="education-title">
        <h2 id="education-title">{translate('Education')}</h2>
        <div className={styles.timeline}>
          {education.map((entry) => (
            <article key={entry.id} className={styles.entry}>
              <div className={styles.entryPeriod}>
                <Period end={entry.endDate} start={entry.startDate} />
              </div>
              <div className={styles.entryContent}>
                {'role' in entry && entry.role ? (
                  <p className={styles.educationRole}>{entry.role}</p>
                ) : null}
                <h3>{entry.qualification}</h3>
                <a
                  className={styles.organisation}
                  href={entry.institutionUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {entry.institution}
                  <span aria-hidden="true"> ↗</span>
                  <span className="visually-hidden">
                    {' '}
                    – {translate('Visit organisation website')}
                  </span>
                </a>
                {'subject' in entry && entry.subject ? (
                  <p className={styles.subject}>{entry.subject}</p>
                ) : null}
                <DetailList details={entry.details} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="skills-title">
        <h2 id="skills-title">{translate('Skills')}</h2>
        <div className={styles.skillGrid}>
          {skillGroups.map((group) => (
            <article key={group.id} className={styles.skillGroup}>
              <h3>{group.title}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill.id} data-emphasis={skill.emphasis}>
                    {skill.label}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
