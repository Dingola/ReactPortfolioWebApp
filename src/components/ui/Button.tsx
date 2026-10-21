import { forwardRef, type ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './Button.module.css';

/** Props accepted by the reusable {@link Button} component. */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Applies the larger dimensions used for prominent page actions. */
  size?: 'default' | 'action';
  /** Visual emphasis applied to the button. Defaults to `primary`. */
  variant?: 'primary' | 'secondary';
};

/**
 * Renders a styled native button while preserving all standard button attributes.
 *
 * The default `type` is `button` so placing the component inside a form does not
 * submit that form unintentionally.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, size = 'default', type = 'button', variant = 'primary', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={clsx(
        styles.button,
        styles[variant],
        size === 'action' && styles.action,
        className,
      )}
      type={type}
      {...props}
    >
      <span className={styles.content}>{children}</span>
    </button>
  );
});
