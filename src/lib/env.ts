import { z } from 'zod';

const environmentSchema = z.object({
  VITE_API_BASE_URL: z
    .string()
    .min(1)
    .default('https://react-portfolio-contact.adrian-helbig.workers.dev'),
  VITE_TURNSTILE_SITE_KEY: z.string().default(''),
});

const parsedEnvironment = environmentSchema.safeParse(import.meta.env);

if (!parsedEnvironment.success) {
  console.error('Invalid environment configuration', parsedEnvironment.error.flatten().fieldErrors);
  throw new Error('Invalid environment configuration. Review .env.example.');
}

/** Validated browser environment used by application infrastructure. */
export const environment = parsedEnvironment.data;
