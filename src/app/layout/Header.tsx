import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

import { LanguageToggle } from '../providers/locale/LanguageToggle';
import { useLocale } from '../providers/locale/useLocale';
import { ThemeToggle } from '../providers/theme/ThemeToggle';
import styles from './Header.module.css';
import { PrimaryNavigation } from './PrimaryNavigation';

/** Renders the persistent portfolio header and responsive primary navigation. */
export function Header() {
  const { content, translate } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const profileName = content.profile.name;
  const menuLabel = translate('Menu');
  const menuAction = translate(isMenuOpen ? 'Close navigation menu' : 'Open navigation menu');

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const closeMenuAndRestoreFocus = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link
          className={styles.brand}
          onClick={closeMenu}
          title={translate('Go to home page')}
          to="/"
        >
          <span className={styles.monogram} aria-hidden="true">
            AH
          </span>
          <span>{profileName}</span>
        </Link>
        <div className={styles.desktopNavigation}>
          <PrimaryNavigation />
        </div>
        <div className={styles.desktopActions}>
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <Button
          ref={menuButtonRef}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={`${menuLabel} – ${menuAction}`}
          className={styles.menuButton}
          onClick={() => setIsMenuOpen((current) => !current)}
          variant="secondary"
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
          </span>
          {menuLabel}
        </Button>
      </Container>
      {isMenuOpen
        ? createPortal(
            <button
              aria-label={translate('Close navigation menu')}
              className={styles.menuBackdrop}
              onClick={closeMenuAndRestoreFocus}
              type="button"
            />,
            document.body,
          )
        : null}
      <div
        className={`${styles.mobilePanel} ${isMenuOpen ? styles.mobilePanelOpen : ''}`}
        hidden={!isMenuOpen}
      >
        <Container className={styles.mobilePanelInner}>
          <PrimaryNavigation id="mobile-navigation" onNavigate={closeMenu} variant="mobile" />
          <div className={styles.mobileActions}>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </Container>
      </div>
    </header>
  );
}
