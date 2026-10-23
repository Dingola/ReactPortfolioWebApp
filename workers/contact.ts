import { z } from 'zod';

const maxRequestBytes = 10_000;
const turnstileVerificationUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const resendEmailUrl = 'https://api.resend.com/emails';

const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  message: z
    .string()
    .trim()
    .max(4000)
    .refine((message) => message.split(/\s+/).filter(Boolean).length >= 3),
  website: z.string().trim().max(0),
  turnstileToken: z.string().min(1).max(2048),
});

export interface ContactWorkerEnvironment {
  readonly CONTACT_ALLOWED_ORIGINS: string;
  readonly CONTACT_EMAIL_FROM: string;
  readonly CONTACT_EMAIL_TO: string;
  readonly RESEND_API_KEY: string;
  readonly TURNSTILE_SECRET_KEY: string;
}

interface ContactRequest {
  readonly name?: unknown;
  readonly email?: unknown;
  readonly message?: unknown;
  readonly website?: unknown;
  readonly turnstileToken?: unknown;
}

interface TurnstileResult {
  readonly success?: boolean;
  readonly action?: string;
}

function getAllowedOrigins(environment: ContactWorkerEnvironment) {
  return new Set(
    environment.CONTACT_ALLOWED_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

function getCorsHeaders(origin?: string) {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  });

  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin);
  }

  return headers;
}

function jsonResponse(body: unknown, status: number, origin?: string) {
  const headers = getCorsHeaders(origin);
  headers.set('Content-Type', 'application/json');

  return new Response(JSON.stringify(body), { status, headers });
}

function methodNotAllowedResponse(origin?: string) {
  const headers = getCorsHeaders(origin);
  headers.set('Allow', 'OPTIONS, POST');
  headers.set('Content-Type', 'application/json');

  return new Response(JSON.stringify({ message: 'Method not allowed.' }), {
    status: 405,
    headers,
  });
}

function preflightResponse(origin: string) {
  const headers = getCorsHeaders(origin);
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Allow-Methods', 'POST');
  headers.set('Access-Control-Max-Age', '86400');

  return new Response(null, { status: 204, headers });
}

async function readRequestBody(request: Request): Promise<ContactRequest | undefined> {
  const contentLength = Number(request.headers.get('content-length') ?? 0);

  if (contentLength > maxRequestBytes) {
    return undefined;
  }

  const payload = await request.arrayBuffer();

  if (payload.byteLength > maxRequestBytes) {
    return undefined;
  }

  try {
    return JSON.parse(new TextDecoder().decode(payload)) as ContactRequest;
  } catch {
    return undefined;
  }
}

async function verifyTurnstile(token: string, secret: string) {
  const formData = new FormData();
  formData.set('secret', secret);
  formData.set('response', token);

  const response = await fetch(turnstileVerificationUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as TurnstileResult;
  return result.success === true && (!result.action || result.action === 'contact');
}

/** Receives validated portfolio messages and forwards them through Resend. */
export default {
  async fetch(request: Request, environment: ContactWorkerEnvironment) {
    const url = new URL(request.url);

    if (url.pathname !== '/contact') {
      return jsonResponse({ message: 'Not found.' }, 404);
    }

    const origin = request.headers.get('origin');
    const allowedOrigin = origin && getAllowedOrigins(environment).has(origin) ? origin : undefined;

    if (!allowedOrigin) {
      return jsonResponse({ message: 'Origin is not allowed.' }, 403);
    }

    if (request.method === 'OPTIONS') {
      const requestedMethod = request.headers.get('access-control-request-method');
      const requestedHeaders = request.headers.get('access-control-request-headers') ?? '';
      const onlyContentTypeRequested = requestedHeaders
        .split(',')
        .map((header) => header.trim().toLowerCase())
        .filter(Boolean)
        .every((header) => header === 'content-type');

      if (requestedMethod !== 'POST' || !onlyContentTypeRequested) {
        return methodNotAllowedResponse(allowedOrigin);
      }

      return preflightResponse(allowedOrigin);
    }

    if (request.method !== 'POST') {
      return methodNotAllowedResponse(allowedOrigin);
    }

    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return jsonResponse({ message: 'Unsupported content type.' }, 415, allowedOrigin);
    }

    const body = await readRequestBody(request);

    if (!body) {
      return jsonResponse({ message: 'Invalid or oversized request body.' }, 400, allowedOrigin);
    }

    if (typeof body.website === 'string' && body.website.trim()) {
      return jsonResponse({ message: 'Message accepted.' }, 200, allowedOrigin);
    }

    const parsedRequest = contactRequestSchema.safeParse(body);

    if (!parsedRequest.success) {
      return jsonResponse({ message: 'Invalid contact details.' }, 400, allowedOrigin);
    }

    const { CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO, RESEND_API_KEY, TURNSTILE_SECRET_KEY } =
      environment;

    if (!RESEND_API_KEY || !CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM || !TURNSTILE_SECRET_KEY) {
      console.error('Contact email environment variables are incomplete.');
      return jsonResponse({ message: 'Contact service is unavailable.' }, 503, allowedOrigin);
    }

    const { email, message, name, turnstileToken } = parsedRequest.data;
    let turnstileIsValid: boolean;

    try {
      turnstileIsValid = await verifyTurnstile(turnstileToken, TURNSTILE_SECRET_KEY);
    } catch {
      console.error('Turnstile verification failed.');
      return jsonResponse({ message: 'Contact verification is unavailable.' }, 502, allowedOrigin);
    }

    if (!turnstileIsValid) {
      return jsonResponse({ message: 'Contact verification failed.' }, 400, allowedOrigin);
    }

    let resendResponse: Response;

    try {
      resendResponse = await fetch(resendEmailUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: CONTACT_EMAIL_FROM,
          to: [CONTACT_EMAIL_TO],
          reply_to: email,
          subject: `Portfolio-Anfrage von ${name}`,
          text: [`Name: ${name}`, `E-Mail: ${email}`, '', message].join('\n'),
        }),
      });
    } catch {
      console.error('The contact email provider could not be reached.');
      return jsonResponse({ message: 'Message delivery failed.' }, 502, allowedOrigin);
    }

    if (!resendResponse.ok) {
      console.error('Resend rejected the contact email.', resendResponse.status);
      return jsonResponse({ message: 'Message delivery failed.' }, 502, allowedOrigin);
    }

    return jsonResponse({ message: 'Message sent.' }, 200, allowedOrigin);
  },
};
