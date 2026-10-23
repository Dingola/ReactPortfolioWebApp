/// <reference types="node" />

import { afterEach, describe, expect, it, vi } from 'vitest';

import contactWorker, { type ContactWorkerEnvironment } from '../../../workers/contact';

const endpointUrl = 'https://react-portfolio-contact.example.workers.dev/contact';
const validBody = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Ich möchte Kontakt aufnehmen.',
  website: '',
  turnstileToken: 'valid-token',
};

const environment: ContactWorkerEnvironment = {
  RESEND_API_KEY: 'test-resend-key',
  CONTACT_EMAIL_TO: 'email@adrianhelbig.de',
  CONTACT_EMAIL_FROM: 'Portfolio <portfolio@send.adrianhelbig.de>',
  TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
  CONTACT_ALLOWED_ORIGINS: 'http://localhost:5173,https://adrianhelbig.de',
};

function createRequest(body: unknown, origin = 'https://adrianhelbig.de') {
  return new Request(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: origin,
    },
    body: JSON.stringify(body),
  });
}

describe('contact endpoint', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('verifies the challenge and forwards valid messages without exposing the sender', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(Response.json({ success: true, action: 'contact' }))
      .mockResolvedValueOnce(Response.json({ id: 'message-id' }));

    const response = await contactWorker.fetch(createRequest(validBody), environment);

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://api.resend.com/emails',
      expect.objectContaining({
        body: expect.stringContaining('"reply_to":"ada@example.com"'),
      }),
    );
    expect(fetchMock.mock.calls[1]?.[1]?.body).not.toContain('"from":"ada@example.com"');
  });

  it('rejects requests from another origin before contacting external services', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');

    const response = await contactWorker.fetch(
      createRequest(validBody, 'https://malicious.example'),
      environment,
    );

    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('silently accepts honeypot submissions without sending email', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');

    const response = await contactWorker.fetch(
      createRequest({ ...validBody, website: 'spam.example' }),
      environment,
    );

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects invalid Turnstile responses before sending email', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(Response.json({ success: false }));

    const response = await contactWorker.fetch(createRequest(validBody), environment);

    expect(response.status).toBe(400);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('answers valid cross-origin preflight requests', async () => {
    const response = await contactWorker.fetch(
      new Request(endpointUrl, {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://adrianhelbig.de',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'content-type',
        },
      }),
      environment,
    );

    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://adrianhelbig.de');
    expect(response.headers.get('Access-Control-Allow-Methods')).toBe('POST');
  });

  it('includes the permitted origin in successful responses', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(Response.json({ success: true, action: 'contact' }))
      .mockResolvedValueOnce(Response.json({ id: 'message-id' }));

    const response = await contactWorker.fetch(createRequest(validBody), environment);

    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://adrianhelbig.de');
    expect(response.headers.get('Vary')).toBe('Origin');
  });
});
