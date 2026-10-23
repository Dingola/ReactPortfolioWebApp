/// <reference types="node" />

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import contactEndpoint from '../../../api/contact';

const endpointUrl = 'https://adrianhelbig.de/api/contact';
const validBody = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Ich möchte Kontakt aufnehmen.',
  website: '',
  turnstileToken: 'valid-token',
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
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.CONTACT_EMAIL_TO = 'email@adrianhelbig.de';
    process.env.CONTACT_EMAIL_FROM = 'Portfolio <portfolio@send.adrianhelbig.de>';
    process.env.TURNSTILE_SECRET_KEY = 'test-turnstile-secret';
    process.env.CONTACT_ALLOWED_ORIGINS = 'http://localhost:5173';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_EMAIL_TO;
    delete process.env.CONTACT_EMAIL_FROM;
    delete process.env.TURNSTILE_SECRET_KEY;
    delete process.env.CONTACT_ALLOWED_ORIGINS;
  });

  it('verifies the challenge and forwards valid messages without exposing the sender', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(Response.json({ success: true, action: 'contact' }))
      .mockResolvedValueOnce(Response.json({ id: 'message-id' }));

    const response = await contactEndpoint.fetch(createRequest(validBody));

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

    const response = await contactEndpoint.fetch(
      createRequest(validBody, 'https://malicious.example'),
    );

    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('silently accepts honeypot submissions without sending email', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');

    const response = await contactEndpoint.fetch(
      createRequest({ ...validBody, website: 'spam.example' }),
    );

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects invalid Turnstile responses before sending email', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(Response.json({ success: false }));

    const response = await contactEndpoint.fetch(createRequest(validBody));

    expect(response.status).toBe(400);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
