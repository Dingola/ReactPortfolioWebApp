import { useEffect } from 'react';

/**
 * Applies a document title for the lifetime of the calling component.
 *
 * The previous title is restored when the component unmounts.
 *
 * @param title - Title assigned to the browser document.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const openGraphTitle = document.head.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]',
    );
    const twitterTitle = document.head.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    document.title = title;
    openGraphTitle?.setAttribute('content', title);
    twitterTitle?.setAttribute('content', title);

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
