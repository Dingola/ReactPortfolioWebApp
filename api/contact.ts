/// <reference types="node" />

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

function jsonResponse(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

function getAllowedOrigins(request: Request) {
  const configuredOrigins = (process.env.CONTACT_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set([new URL(request.url).origin, ...configuredOrigins]);
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
  const response = await fetch(turnstileVerificationUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as TurnstileResult;
  return result.success === true && (!result.action || result.action === 'contact');
}

/** Receives validated portfolio messages and forwards them through Resend. */
export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ message: 'Method not allowed.' }), {
        status: 405,
        headers: {
          Allow: 'POST',
          'Cache-Control': 'no-store',
          'Content-Type': 'application/json',
        },
      });
    }

    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return jsonResponse({ message: 'Unsupported content type.' }, 415);
    }

    const origin = request.headers.get('origin');

    if (!origin || !getAllowedOrigins(request).has(origin)) {
      return jsonResponse({ message: 'Origin is not allowed.' }, 403);
    }

    const body = await readRequestBody(request);

    if (!body) {
      return jsonResponse({ message: 'Invalid or oversized request body.' }, 400);
    }

    if (typeof body.website === 'string' && body.website.trim()) {
      return jsonResponse({ message: 'Message accepted.' }, 200);
    }

    const parsedRequest = contactRequestSchema.safeParse(body);

    if (!parsedRequest.success) {
      return jsonResponse({ message: 'Invalid contact details.' }, 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL_TO;
    const sender = process.env.CONTACT_EMAIL_FROM;
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

    if (!apiKey || !recipient || !sender || !turnstileSecret) {
      console.error('Contact email environment variables are incomplete.');
      return jsonResponse({ message: 'Contact service is unavailable.' }, 503);
    }

    const { email, message, name, turnstileToken } = parsedRequest.data;
    let turnstileIsValid: boolean;

    try {
      turnstileIsValid = await verifyTurnstile(turnstileToken, turnstileSecret);
    } catch {
      console.error('Turnstile verification failed.');
      return jsonResponse({ message: 'Contact verification is unavailable.' }, 502);
    }

    if (!turnstileIsValid) {
      return jsonResponse({ message: 'Contact verification failed.' }, 400);
    }

    let resendResponse: Response;

    try {
      resendResponse = await fetch(resendEmailUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: sender,
          to: [recipient],
          reply_to: email,
          subject: `Portfolio-Anfrage von ${name}`,
          text: [`Name: ${name}`, `E-Mail: ${email}`, '', message].join('\n'),
        }),
      });
    } catch {
      console.error('The contact email provider could not be reached.');
      return jsonResponse({ message: 'Message delivery failed.' }, 502);
    }

    if (!resendResponse.ok) {
      console.error('Resend rejected the contact email.', resendResponse.status);
      return jsonResponse({ message: 'Message delivery failed.' }, 502);
    }

    return jsonResponse({ message: 'Message sent.' }, 200);
  },
};
