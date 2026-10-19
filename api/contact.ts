const maxRequestBytes = 10_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactRequest {
  readonly name?: unknown;
  readonly email?: unknown;
  readonly message?: unknown;
  readonly website?: unknown;
}

function readText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function jsonResponse(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

/** Receives validated portfolio messages and forwards them through Resend. */
export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return jsonResponse({ message: 'Method not allowed.' }, 405);
    }

    const contentLength = Number(request.headers.get('content-length') ?? 0);

    if (contentLength > maxRequestBytes) {
      return jsonResponse({ message: 'Request is too large.' }, 413);
    }

    let body: ContactRequest;

    try {
      body = (await request.json()) as ContactRequest;
    } catch {
      return jsonResponse({ message: 'Invalid request body.' }, 400);
    }

    const name = readText(body.name);
    const email = readText(body.email);
    const message = readText(body.message);
    const website = readText(body.website);

    if (website) {
      return jsonResponse({ message: 'Message accepted.' }, 200);
    }

    const messageWordCount = message.split(/\s+/).filter(Boolean).length;

    if (
      name.length < 2 ||
      name.length > 120 ||
      !emailPattern.test(email) ||
      email.length > 254 ||
      messageWordCount < 3 ||
      message.length > 4000
    ) {
      return jsonResponse({ message: 'Invalid contact details.' }, 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL_TO;
    const sender = process.env.CONTACT_EMAIL_FROM;

    if (!apiKey || !recipient || !sender) {
      console.error('Contact email environment variables are incomplete.');
      return jsonResponse({ message: 'Contact service is unavailable.' }, 503);
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
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

    if (!resendResponse.ok) {
      console.error('Resend rejected the contact email.', resendResponse.status);
      return jsonResponse({ message: 'Message delivery failed.' }, 502);
    }

    return jsonResponse({ message: 'Message sent.' }, 200);
  },
};
