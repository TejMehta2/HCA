'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { type Theme } from '../../foundation/Themes/Themes.types';
import themeStyles from '../../foundation/Themes/Themes.module.scss';
import styles from './NavigationDesktop.module.scss';

const themeModes: Record<Theme, 'dark' | 'light'> = {
  'A-HCA-White': 'dark',
  'B-HCA-Navy-Blue': 'light',
  'C-HCA-Denim': 'light',
  'D-HCA-Teal': 'dark',
  'E-HCA-Cerulean': 'dark',
  'F-HCA-Fern': 'dark',
  'G-HCA-Orange': 'dark',
  'H-HCA-Tangerine': 'dark',
  'I-HCA-Goldenrod': 'dark',
  'J-HCA-Tangerine-20': 'dark',
  'K-HCA-Fern-20': 'dark',
  'L-HCA-Teal-5': 'dark',
  'M-HCA-Goldenrod-20': 'dark',
  'N-HCA-Denim-5': 'dark',
  'O-HCA-Teal-20': 'dark',
  'Palace-White': 'dark',
  'Palace-Grey': 'light',
  'Palace-Beige': 'dark',
  'Palace-Red': 'light',
  'Chelsea-White': 'dark',
  'Chelsea-Navy-Blue': 'light',
  'Chelsea-Beige': 'dark',
  'Chelsea-Gold': 'dark',
  LBI: 'dark',
  'LBI-Dark': 'dark',
  'LBI-White': 'light',
  'Alan-Black': 'light',
  'Alan-White': 'dark',
  'Alan-Light-Grey': 'dark',
};

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
    const root = marker?.closest<HTMLElement>(
      '[data-navigation-desktop-root]'
    );

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
      themeRoot.setAttribute('data-theme-mode', themeModes[nextTheme]);
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

    controls.forEach((control) => {
      const tabIndex = Number(control.dataset.navigationDesktopTabIndex);

      const openTab = () => setActiveIndex(tabIndex);
      const toggleTab = () =>
        setActiveIndex(activeIndex === tabIndex ? null : tabIndex);

      control.addEventListener('mouseenter', openTab);
      control.addEventListener('click', toggleTab);

      removeHandlers.push(() => {
        control.removeEventListener('mouseenter', openTab);
        control.removeEventListener('click', toggleTab);
      });
    });

    root.addEventListener('mouseleave', closeNavigation);
    removeHandlers.push(() =>
      root.removeEventListener('mouseleave', closeNavigation)
    );

    setActiveIndex(initialActiveIndex);

    return () => {
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
