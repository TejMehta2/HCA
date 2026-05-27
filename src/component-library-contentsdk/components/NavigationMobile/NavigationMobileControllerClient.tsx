'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getThemeMode } from '../../foundation/Themes/Themes.config';
import { type Theme } from '../../foundation/Themes/Themes.types';
import themeStyles from '../../foundation/Themes/Themes.module.scss';
import styles from './NavigationMobile.module.scss';

type NavigationMobileControllerClientProps = {
  themeClosed: Theme;
  themeOpen: Theme;
};

const NavigationMobileControllerClient = ({
  themeClosed,
  themeOpen,
}: NavigationMobileControllerClientProps) => {
  const markerRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const marker = markerRef.current;
    const root = marker?.closest<HTMLElement>('[data-navigation-mobile-root]');

    if (!root) return;

    const themeRoot = root.parentElement;
    const drawer = root.querySelector<HTMLElement>(
      '[data-navigation-mobile-drawer]'
    );
    const toggle = root.querySelector<HTMLButtonElement>(
      '[data-navigation-mobile-toggle]'
    );
    const toggleLabel = root.querySelector<HTMLElement>(
      '[data-navigation-mobile-toggle-label]'
    );
    const links = root.querySelector<HTMLElement>(
      '[data-navigation-mobile-links]'
    );
    const eyebrow = root.querySelector<HTMLElement>(
      '[data-navigation-mobile-eyebrow]'
    );
    const activePrimaryLabel = root.querySelector<HTMLElement>(
      '[data-navigation-mobile-active-primary-label]'
    );
    const primaryItems = Array.from(
      root.querySelectorAll<HTMLElement>('[data-navigation-mobile-primary-item]')
    );
    const primaryButtons = Array.from(
      root.querySelectorAll<HTMLButtonElement>(
        '[data-navigation-mobile-primary-button]'
      )
    );
    const secondaryGroups = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-navigation-mobile-secondary-group]'
      )
    );
    const secondaryItems = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-navigation-mobile-secondary-item]'
      )
    );
    const secondaryButtons = Array.from(
      root.querySelectorAll<HTMLButtonElement>(
        '[data-navigation-mobile-secondary-button]'
      )
    );
    const tertiaryGroups = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-navigation-mobile-tertiary-group]'
      )
    );
    const secondaryBottoms = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-navigation-mobile-secondary-bottom]'
      )
    );
    const primaryBottoms = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-navigation-mobile-primary-bottom]'
      )
    );
    const backMenu = root.querySelector<HTMLElement>(
      '[data-navigation-mobile-back="menu"]'
    );
    const backSecondary = root.querySelector<HTMLElement>(
      '[data-navigation-mobile-back="secondary"]'
    );
    const backMenuButton = root.querySelector<HTMLButtonElement>(
      '[data-navigation-mobile-back-button="menu"]'
    );
    const backSecondaryButton = root.querySelector<HTMLButtonElement>(
      '[data-navigation-mobile-back-button="secondary"]'
    );

    let isOpen = false;
    let primaryChoice: number | null = null;
    let secondaryChoice: number | null = null;

    const setTheme = (nextIsOpen: boolean) => {
      if (!themeRoot) return;

      const nextTheme = nextIsOpen ? themeOpen : themeClosed;
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

    const getPrimaryButton = (index: number | null) =>
      index === null
        ? undefined
        : primaryButtons.find(
            (button) =>
              Number(button.dataset.navigationMobilePrimaryIndex) === index
          );

    const getPrimaryContentCount = (index: number | null) =>
      Number(
        getPrimaryButton(index)?.dataset.navigationMobilePrimaryContentCount ||
          0
      );

    const updateNavigation = () => {
      root.classList.toggle(styles.open, isOpen);
      root.classList.toggle(styles.closed, !isOpen);
      drawer?.classList.toggle(styles.open, isOpen);
      toggle?.setAttribute('aria-expanded', String(isOpen));

      if (isOpen) {
        toggle?.setAttribute('data-navigation-type', 'mobileNavigationOpen');
      } else {
        toggle?.removeAttribute('data-navigation-type');
      }

      if (toggleLabel) {
        toggleLabel.textContent = isOpen
          ? 'Close navigation'
          : 'Open navigation';
      }

      setTheme(isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      const selectedPrimaryButton = getPrimaryButton(primaryChoice);
      const primaryContentCount = getPrimaryContentCount(primaryChoice);

      if (activePrimaryLabel) {
        activePrimaryLabel.textContent =
          selectedPrimaryButton?.dataset.navigationMobilePrimaryLabel || '';
      }

      primaryItems.forEach((item) => {
        item.classList.toggle(styles.hidden, primaryChoice !== null);
      });

      secondaryGroups.forEach((group) => {
        const primaryIndex = Number(group.dataset.navigationMobilePrimaryIndex);
        group.classList.toggle(styles.hidden, primaryChoice !== primaryIndex);
      });

      secondaryItems.forEach((item) => {
        const primaryIndex = Number(item.dataset.navigationMobilePrimaryIndex);
        item.classList.toggle(
          styles.hidden,
          primaryChoice !== primaryIndex || secondaryChoice !== null
        );
      });

      tertiaryGroups.forEach((group) => {
        const primaryIndex = Number(group.dataset.navigationMobilePrimaryIndex);
        const secondaryIndex = Number(
          group.dataset.navigationMobileSecondaryIndex
        );

        group.classList.toggle(
          styles.hidden,
          primaryChoice !== primaryIndex || secondaryChoice !== secondaryIndex
        );
      });

      secondaryBottoms.forEach((bottom) => {
        const primaryIndex = Number(bottom.dataset.navigationMobilePrimaryIndex);
        const secondaryIndex = Number(
          bottom.dataset.navigationMobileSecondaryIndex
        );

        bottom.classList.toggle(
          styles.hidden,
          primaryChoice !== primaryIndex || secondaryChoice !== secondaryIndex
        );
      });

      primaryBottoms.forEach((bottom) => {
        const primaryIndex = Number(bottom.dataset.navigationMobilePrimaryIndex);
        const singleLevel = bottom.dataset.navigationMobileSingleLevel === 'true';

        bottom.classList.toggle(
          styles.hidden,
          primaryChoice !== primaryIndex ||
            (secondaryChoice !== null && !singleLevel)
        );
      });

      links?.classList.toggle(
        styles.primary,
        primaryChoice === null && secondaryChoice === null
      );
      backMenu?.classList.toggle(
        styles.hidden,
        primaryChoice === null ||
          !(secondaryChoice === null || primaryContentCount <= 1)
      );
      backSecondary?.classList.toggle(
        styles.hidden,
        primaryChoice === null ||
          secondaryChoice === null ||
          primaryContentCount <= 1
      );
      eyebrow?.classList.toggle(styles.hidden, primaryChoice !== null);
    };

    const closeNavigation = () => {
      isOpen = false;
      primaryChoice = null;
      secondaryChoice = null;
      updateNavigation();
    };

    const removeHandlers: Array<() => void> = [];

    const onToggle = () => {
      if (isOpen) {
        closeNavigation();
        return;
      }

      isOpen = true;
      updateNavigation();
    };

    toggle?.addEventListener('click', onToggle);
    removeHandlers.push(() => toggle?.removeEventListener('click', onToggle));

    primaryButtons.forEach((button) => {
      const onPrimaryClick = () => {
        isOpen = true;
        primaryChoice = Number(button.dataset.navigationMobilePrimaryIndex);
        secondaryChoice =
          getPrimaryContentCount(primaryChoice) <= 1 ? 0 : null;
        updateNavigation();
      };

      button.addEventListener('click', onPrimaryClick);
      removeHandlers.push(() =>
        button.removeEventListener('click', onPrimaryClick)
      );
    });

    secondaryButtons.forEach((button) => {
      const onSecondaryClick = () => {
        primaryChoice = Number(button.dataset.navigationMobilePrimaryIndex);
        secondaryChoice = Number(button.dataset.navigationMobileSecondaryIndex);
        updateNavigation();
      };

      button.addEventListener('click', onSecondaryClick);
      removeHandlers.push(() =>
        button.removeEventListener('click', onSecondaryClick)
      );
    });

    const onBackMenu = () => {
      primaryChoice = null;
      secondaryChoice = null;
      updateNavigation();
    };

    const onBackSecondary = () => {
      secondaryChoice = null;
      updateNavigation();
    };

    backMenuButton?.addEventListener('click', onBackMenu);
    backSecondaryButton?.addEventListener('click', onBackSecondary);
    removeHandlers.push(() =>
      backMenuButton?.removeEventListener('click', onBackMenu)
    );
    removeHandlers.push(() =>
      backSecondaryButton?.removeEventListener('click', onBackSecondary)
    );

    closeNavigation();

    return () => {
      removeHandlers.forEach((removeHandler) => removeHandler());
      document.body.style.overflow = '';
    };
  }, [themeClosed, themeOpen, pathname, searchParams]);

  return (
    <span
      ref={markerRef}
      hidden
      aria-hidden="true"
      data-navigation-mobile-controller
    />
  );
};

export default NavigationMobileControllerClient;
