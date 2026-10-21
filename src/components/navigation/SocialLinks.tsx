import clsx from 'clsx';

import { useLocale } from '@/app/providers/locale/useLocale';
import { germanPortfolioContent } from '@/content/portfolio.de';

import styles from './SocialLinks.module.css';

export interface SocialLinksProps {
  readonly className?: string | undefined;
  readonly showLabels?: boolean | undefined;
}

/** Links to the portfolio owner's professional profiles using the official brand marks. */
export function SocialLinks({ className, showLabels = false }: SocialLinksProps) {
  const { translate } = useLocale();
  const profiles = germanPortfolioContent.contactLinks.filter(
    (link) => link.kind === 'github' || link.kind === 'linkedin',
  );

  return (
    <div
      className={clsx(styles.links, showLabels && styles.labeled, className)}
      aria-label={translate('Professional profiles')}
    >
      {profiles.map((profile) => {
        const accessibleLabel = translate(
          profile.kind === 'github' ? 'View GitHub profile' : 'View LinkedIn profile',
        );

        return (
          <a
            key={profile.id}
            className={styles.link}
            href={profile.href}
            aria-label={accessibleLabel}
            rel="noreferrer"
            target="_blank"
          >
            {profile.kind === 'github' ? (
              <span className={styles.githubMark} aria-hidden="true">
                <img
                  className={styles.githubLight}
                  src="/images/social/github/github-mark.svg"
                  alt=""
                  width="98"
                  height="96"
                />
                <img
                  className={styles.githubDark}
                  src="/images/social/github/github-mark-white.svg"
                  alt=""
                  width="98"
                  height="96"
                />
              </span>
            ) : (
              <img
                className={styles.linkedinMark}
                src="/images/social/linkedin/linkedin-in.png"
                alt=""
                width="635"
                height="540"
                aria-hidden="true"
              />
            )}
            {showLabels ? <span>{profile.label}</span> : null}
          </a>
        );
      })}
    </div>
  );
}
