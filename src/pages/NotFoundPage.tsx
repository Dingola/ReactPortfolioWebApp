import { ErrorFallback } from '@/app/errors/ErrorFallback';

/** Renders the fallback page for URLs that do not match an application route. */
export default function NotFoundPage() {
  return (
    <ErrorFallback
      description="The requested page does not exist."
      embedded
      showContact={false}
      showRetry={false}
      statusCode={404}
      title="Page not found"
    />
  );
}
