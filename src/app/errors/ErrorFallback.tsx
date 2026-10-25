import { useEffect, useRef } from 'react';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import buttonStyles from '@/components/ui/Button.module.css';
import type { SourceMessage } from '@/i18n/messages';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import styles from './ErrorFallback.module.css';

export interface ErrorFallbackProps {
  readonly description: SourceMessage;
  readonly embedded?: boolean;
  /** Recovery action invoked by the retry button. */
  readonly onRetry?: () => void;
  readonly showContact?: boolean;
  readonly showRetry?: boolean;
  readonly statusCode?: number;
  readonly title: SourceMessage;
}

function reloadPage() {
  window.location.reload();
}

/** Presents a safe, localized recovery view without exposing technical error details. */
export function ErrorFallback({
  description,
  embedded = false,
  onRetry = reloadPage,
  showContact = true,
  showRetry = true,
  statusCode = 500,
  title,
}: ErrorFallbackProps) {
  const { content, translate } = useLocale();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const translatedTitle = translate(title);

  useDocumentTitle(`${translatedTitle} · ${appConfig.siteName}`);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const errorContent = (
    <section className={styles.content} aria-describedby="error-description">
      <p className={styles.eyebrow}>ERROR / {statusCode}</p>
      <h1 id="error-title" ref={headingRef} tabIndex={-1}>
        {translatedTitle}
      </h1>
      <p className={styles.description} id="error-description">
        {translate(description)}
      </p>

      <div className={styles.actions}>
        {showRetry ? (
          <button
            className={`${buttonStyles.button} ${buttonStyles.action} ${buttonStyles.primary}`}
            onClick={onRetry}
            type="button"
          >
            <span className={buttonStyles.content}>
              {translate('Try again')}
              <span aria-hidden="true">↻</span>
            </span>
          </button>
        ) : null}
        <a
          className={`${buttonStyles.button} ${buttonStyles.action} ${showRetry ? buttonStyles.secondary : buttonStyles.primary}`}
          href="/"
        >
          <span className={buttonStyles.content}>
            {translate('Return to the home page')}
            <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>

      {showContact ? (
        <p className={styles.support}>
          {translate('If the problem persists, use the contact page.')}{' '}
          <a href="/contact">{translate('Open contact page')}</a>
        </p>
      ) : null}
    </section>
  );

  if (embedded) {
    return (
      <section
        className={`${styles.page} ${styles.embedded}`}
        role="alert"
        aria-labelledby="error-title"
      >
        {errorContent}
      </section>
    );
  }

  return (
    <main className={styles.page} role="alert" aria-labelledby="error-title">
      <a className={styles.brand} href="/" title={translate('Go to home page')}>
        <span className={styles.monogram} aria-hidden="true">
          AH
        </span>
        <span>{content.profile.name}</span>
      </a>
      {errorContent}
    </main>
  );
}
