import { useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { getNavigationDirection, type NavigationDirection } from './navigation';
import styles from './PageTransition.module.css';

interface TransitionContext {
  readonly direction: NavigationDirection;
  readonly distance: number;
  readonly reduceMotion: boolean;
}

interface NavigationState {
  readonly direction: NavigationDirection;
  readonly pathname: string;
}

const pageVariants = {
  enter: ({ direction, distance, reduceMotion }: TransitionContext) => ({
    opacity: reduceMotion ? 1 : 0,
    x: reduceMotion || direction === 'none' ? 0 : direction === 'forward' ? distance : -distance,
  }),
  center: { opacity: 1, x: 0 },
  exit: ({ direction, distance, reduceMotion }: TransitionContext) => ({
    opacity: reduceMotion ? 1 : 0,
    x: reduceMotion || direction === 'none' ? 0 : direction === 'forward' ? -distance : distance,
    transition: { duration: 0 },
  }),
};

/** Animates route content while keeping the surrounding application layout mounted. */
export function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion() ?? false;
  const isMobile = useMediaQuery('(width <= 48rem)');
  const [storedNavigation, setStoredNavigation] = useState<NavigationState>({
    direction: 'none',
    pathname: location.pathname,
  });
  let navigation = storedNavigation;

  if (storedNavigation.pathname !== location.pathname) {
    navigation = {
      direction: getNavigationDirection(storedNavigation.pathname, location.pathname),
      pathname: location.pathname,
    };
    setStoredNavigation(navigation);
  }

  const transitionContext: TransitionContext = {
    direction: navigation.direction,
    distance: isMobile ? 28 : 64,
    reduceMotion,
  };

  return (
    <div className={styles.viewport} data-reduced-motion={reduceMotion || undefined}>
      <AnimatePresence custom={transitionContext} initial={false} mode="popLayout">
        <motion.div
          key={location.pathname}
          animate="center"
          className={styles.page}
          custom={transitionContext}
          data-transition-direction={navigation.direction}
          exit="exit"
          initial="enter"
          transition={{
            duration: reduceMotion ? 0 : isMobile ? 0.35 : 0.4,
            ease: [0.2, 0, 0, 1],
          }}
          variants={pageVariants}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
