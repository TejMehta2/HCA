'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getThemeMode } from '../../foundation/Themes/Themes.config';
import { type Theme } from '../../foundation/Themes/Themes.types';
import themeStyles from '../../foundation/Themes/Themes.module.scss';
import styles from './NavigationDesktop.module.scss';

const HOVER_OPEN_DELAY_MS = 160;

type NavigationDesktopControllerClientProps = {
  initialActiveIndex?: number | null;
  themeClosed: Theme;
  themeOpen: Theme;
};

const NavigationDesktopControllerClient = ({
  initialActiveIndex = null,
  themeClosed,
  themeOpen,
}: NavigationDesktopControllerClientProps) => {
  const markerRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const marker = markerRef.current;
    const root = marker?.closest<HTMLElement>('[data-navigation-desktop-root]');

    if (!root) return;

    const themeRoot = root.parentElement;
    const controls = Array.from(
      root.querySelectorAll<HTMLElement>('[data-navigation-desktop-control]')
    );
    const drawers = Array.from(
      root.querySelectorAll<HTMLElement>('[data-navigation-desktop-drawer]')
    );

    let activeIndex = initialActiveIndex;

    const setTheme = (isOpen: boolean) => {
      if (!themeRoot) return;

      const nextTheme = isOpen ? themeOpen : themeClosed;
      const openThemeClass = themeStyles[themeOpen];
      const closedThemeClass = themeStyles[themeClosed];
      const nextThemeClass = themeStyles[nextTheme];

      if (openThemeClass) {
        themeRoot.classList.remove(openThemeClass);
      }

      if (closedThemeClass) {
        themeRoot.classList.remove(closedThemeClass);
      }

      if (nextThemeClass) {
        themeRoot.classList.add(nextThemeClass);
      }

      themeRoot.setAttribute('data-theme', nextTheme);
      themeRoot.setAttribute('data-theme-mode', getThemeMode(nextTheme));
    };

    const setActiveIndex = (nextActiveIndex: number | null) => {
      activeIndex = nextActiveIndex;
      const isOpen = activeIndex !== null;

      root.classList.toggle(styles.open, isOpen);
      root.classList.toggle(styles.closed, !isOpen);
      setTheme(isOpen);

      controls.forEach((control) => {
        const tabIndex = Number(control.dataset.navigationDesktopTabIndex);
        const isActive = tabIndex === activeIndex;
        const button = control.querySelector('button');

        control.classList.toggle(styles.active, isActive);
        button?.setAttribute('aria-expanded', String(isActive));
      });

      drawers.forEach((drawer) => {
        const tabIndex = Number(drawer.dataset.navigationDesktopTabIndex);
        drawer.classList.toggle(styles.active, tabIndex === activeIndex);
      });
    };

    const closeNavigation = () => setActiveIndex(null);
    const removeHandlers: Array<() => void> = [];
    let hoverOpenTimeout: number | undefined;

    const clearHoverOpenTimeout = () => {
      if (hoverOpenTimeout === undefined) return;

      window.clearTimeout(hoverOpenTimeout);
      hoverOpenTimeout = undefined;
    };

    controls.forEach((control) => {
      const tabIndex = Number(control.dataset.navigationDesktopTabIndex);

      const openTab = () => setActiveIndex(tabIndex);
      const openTabWithDelay = () => {
        clearHoverOpenTimeout();
        hoverOpenTimeout = window.setTimeout(openTab, HOVER_OPEN_DELAY_MS);
      };
      const toggleTab = () => {
        clearHoverOpenTimeout();
        setActiveIndex(activeIndex === tabIndex ? null : tabIndex);
      };

      control.addEventListener('mouseenter', openTabWithDelay);
      control.addEventListener('mouseleave', clearHoverOpenTimeout);
      control.addEventListener('click', toggleTab);

      removeHandlers.push(() => {
        control.removeEventListener('mouseenter', openTabWithDelay);
        control.removeEventListener('mouseleave', clearHoverOpenTimeout);
        control.removeEventListener('click', toggleTab);
      });
    });

    const closeNavigationOnLeave = () => {
      clearHoverOpenTimeout();
      closeNavigation();
    };

    root.addEventListener('mouseleave', closeNavigationOnLeave);
    removeHandlers.push(() =>
      root.removeEventListener('mouseleave', closeNavigationOnLeave)
    );

    setActiveIndex(initialActiveIndex);

    return () => {
      clearHoverOpenTimeout();
      removeHandlers.forEach((removeHandler) => removeHandler());
    };
  }, [initialActiveIndex, themeClosed, themeOpen, pathname, searchParams]);

  return (
    <span
      ref={markerRef}
      hidden
      aria-hidden="true"
      data-navigation-desktop-controller
    />
  );
};

export default NavigationDesktopControllerClient;
