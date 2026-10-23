import { useEffect, useRef } from 'react';

import { useLocale } from '@/app/providers/locale/useLocale';
import { useTheme } from '@/app/providers/theme/useTheme';
import { environment } from '@/lib/env';

import styles from './TurnstileWidget.module.css';

const scriptId = 'cloudflare-turnstile-script';
const scriptSource = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileWidgetId = string;

interface TurnstileApi {
  readonly render: (
    container: HTMLElement,
    options: {
      readonly sitekey: string;
      readonly action: string;
      readonly appearance: 'interaction-only';
      readonly language: string;
      readonly size: 'flexible';
      readonly theme: 'light' | 'dark';
      readonly callback: (token: string) => void;
      readonly 'error-callback': () => void;
      readonly 'expired-callback': () => void;
    },
  ) => TurnstileWidgetId;
  readonly remove: (widgetId: TurnstileWidgetId) => void;
  readonly reset: (widgetId: TurnstileWidgetId) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** Props accepted by {@link TurnstileWidget}. */
export interface TurnstileWidgetProps {
  /** Receives a verified token or `undefined` when verification is unavailable. */
  readonly onTokenChange: (token: string | undefined) => void;
  /** Incremented after each submission to invalidate the previously used token. */
  readonly resetKey: number;
}

function loadTurnstileScript() {
  const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (existingScript) {
    return existingScript;
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = scriptSource;
  script.async = true;
  script.defer = true;
  document.head.append(script);
  return script;
}

/** Renders the Cloudflare Turnstile challenge used to protect contact submissions. */
export function TurnstileWidget({ onTokenChange, resetKey }: TurnstileWidgetProps) {
  const { locale, translate } = useLocale();
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<TurnstileWidgetId | undefined>(undefined);
  const siteKey = environment.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    onTokenChange(undefined);

    if (!siteKey || !containerRef.current) {
      return undefined;
    }

    let disposed = false;
    let retryTimer: number | undefined;

    const renderWidget = () => {
      if (disposed || !containerRef.current) {
        return;
      }

      if (!window.turnstile) {
        retryTimer = window.setTimeout(renderWidget, 50);
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: 'contact',
        appearance: 'interaction-only',
        language: locale,
        size: 'flexible',
        theme: resolvedTheme,
        callback: (token) => onTokenChange(token),
        'error-callback': () => onTokenChange(undefined),
        'expired-callback': () => onTokenChange(undefined),
      });
    };

    const script = loadTurnstileScript();

    if (window.turnstile) {
      renderWidget();
    } else {
      script.addEventListener('load', renderWidget, { once: true });
    }

    return () => {
      disposed = true;
      script.removeEventListener('load', renderWidget);

      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
      }

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = undefined;
      }
    };
  }, [locale, onTokenChange, resolvedTheme, siteKey]);

  useEffect(() => {
    if (resetKey > 0 && widgetIdRef.current && window.turnstile) {
      onTokenChange(undefined);
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [onTokenChange, resetKey]);

  if (!siteKey) {
    return (
      <p className={styles.notice} role="status">
        {translate('Contact form protection is not configured.')}
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-label={translate('Spam protection')}
      data-testid="turnstile-widget"
    />
  );
}
