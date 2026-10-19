import { describe, expect, it } from 'vitest';

import { validateContactForm } from './contactValidation';

describe('validateContactForm', () => {
  it('normalizes valid contact details', () => {
    const result = validateContactForm({
      name: '  Ada Lovelace  ',
      email: '  ada@example.com ',
      message: '  Ich möchte mehr erfahren.  ',
      website: '',
    });

    expect(result.errors).toEqual({});
    expect(result.data).toEqual({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Ich möchte mehr erfahren.',
      website: '',
    });
  });

  it('reports invalid fields independently', () => {
    const result = validateContactForm({
      name: 'A',
      email: 'invalid',
      message: 'Zu kurz',
      website: '',
    });

    expect(result.errors).toEqual({
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      message: 'Please write at least three words.',
    });
  });
});
