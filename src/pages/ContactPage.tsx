import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { appConfig } from '@/app/config';
import { useLocale } from '@/app/providers/locale/useLocale';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import {
  type ContactField,
  type ContactFormErrors,
  validateContactForm,
} from '@/features/contact/contactValidation';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import type { SourceMessage } from '@/i18n/messages';
import { apiRequest } from '@/lib/api/apiClient';

import styles from './ContactPage.module.css';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

interface FloatingFieldProps {
  readonly id: ContactField;
  readonly label: string;
  readonly error?: string | undefined;
  readonly multiline?: boolean;
}

function FloatingField({ id, label, error, multiline = false }: FloatingFieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  const commonProps = {
    id,
    name: id,
    className: styles.control,
    placeholder: ' ',
    required: true,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
  } as const;

  return (
    <div className={styles.field}>
      <div className={styles.controlWrapper}>
        {multiline ? (
          <textarea {...commonProps} maxLength={4000} rows={7} />
        ) : (
          <input
            {...commonProps}
            autoComplete={id === 'name' ? 'name' : 'email'}
            maxLength={id === 'name' ? 120 : 254}
            type={id === 'email' ? 'email' : 'text'}
          />
        )}
        <label htmlFor={id}>{label}</label>
      </div>
      {error ? (
        <p id={describedBy} className={styles.fieldError}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Renders the contact options and message form. */
export default function ContactPage() {
  const { content, translate } = useLocale();
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  useDocumentTitle(`${translate('Contact')} · ${appConfig.name}`);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = validateContactForm({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
    });

    setErrors(result.errors);

    if (Object.keys(result.errors).length > 0) {
      setSubmissionState('idle');
      return;
    }

    setSubmissionState('submitting');

    try {
      await apiRequest<{ readonly message: string }>('/contact', {
        method: 'POST',
        body: result.data,
      });
      form.reset();
      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
    }
  }

  const statusMessage: SourceMessage | undefined =
    submissionState === 'success'
      ? 'Thank you. Your message has been sent successfully.'
      : submissionState === 'error'
        ? 'Your message could not be sent. Please try again later or use one of the direct contact options.'
        : undefined;

  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>05 / {translate('Contact')}</p>
        <h1>{translate('Contact')}</h1>
        <p>{translate('Let us talk about software, projects, and new opportunities.')}</p>
      </header>

      <div className={styles.content}>
        <aside className={styles.contactOptions} aria-labelledby="direct-contact-title">
          <p className={styles.sectionIndex}>01</p>
          <h2 id="direct-contact-title">{translate('Direct contact')}</h2>
          <ul>
            {content.contactLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  rel={link.kind === 'email' ? undefined : 'noreferrer'}
                  target={link.kind === 'email' ? undefined : '_blank'}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">{link.kind === 'email' ? '→' : '↗'}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <section className={styles.formSection} aria-labelledby="contact-form-title">
          <p className={styles.sectionIndex}>02</p>
          <h2 id="contact-form-title">{translate('Contact form')}</h2>
          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <FloatingField
              id="name"
              label={`${translate('Your name')} *`}
              error={errors.name ? translate(errors.name) : undefined}
            />
            <FloatingField
              id="email"
              label={`${translate('Your email address')} *`}
              error={errors.email ? translate(errors.email) : undefined}
            />
            <FloatingField
              id="message"
              label={`${translate('Your message')} *`}
              error={errors.message ? translate(errors.message) : undefined}
              multiline
            />
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className={styles.formFooter}>
              <p className={styles.privacyNotice}>
                {translate(
                  'Your data is stored only to process your request. Find all details in the',
                )}{' '}
                <Link to="/privacy">{translate('privacy policy')}</Link>.
              </p>
              <Button disabled={submissionState === 'submitting'} size="action" type="submit">
                {translate(submissionState === 'submitting' ? 'Sending message…' : 'Send message')}
                <span aria-hidden="true">→</span>
              </Button>
            </div>

            {statusMessage ? (
              <p
                className={styles.status}
                data-state={submissionState}
                role={submissionState === 'error' ? 'alert' : 'status'}
              >
                {translate(statusMessage)}
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </Container>
  );
}
