import type { SourceMessage } from '@/i18n/messages';

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly website: string;
}

/** User-editable fields validated by the contact form. */
export type ContactField = 'name' | 'email' | 'message';

/** Localized validation message associated with each invalid contact field. */
export type ContactFormErrors = Partial<Record<ContactField, SourceMessage>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates and normalizes contact form input before it is submitted. */
export function validateContactForm(data: ContactFormData) {
  const normalizedData = {
    name: data.name.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
    website: data.website.trim(),
  };
  const errors: ContactFormErrors = {};

  if (normalizedData.name.length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!emailPattern.test(normalizedData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (normalizedData.message.split(/\s+/).filter(Boolean).length < 3) {
    errors.message = 'Please write at least three words.';
  }

  return { data: normalizedData, errors };
}
