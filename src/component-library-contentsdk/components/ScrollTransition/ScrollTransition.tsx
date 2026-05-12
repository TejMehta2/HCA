'use client';

import React, { useEffect, useRef, useState, type JSX } from 'react';
import { ScrollTransitionProps } from './ScrollTransition.types';
import styles from './ScrollTransition.module.scss';
import Themes from '../../foundation/Themes/Themes';
import { Theme as ThemeTypes } from '../../foundation/Themes/Themes.types';

const ScrollTransition = (props: ScrollTransitionProps): JSX.Element => {
  const {
    children,
    initialTheme = 'A-HCA-White',
    transitionBackground = true,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [currentTheme, setCurrentTheme] = useState<ThemeTypes>(initialTheme);

  useEffect(() => {
    const targetSections = wrapperRef?.current?.querySelectorAll(
      ':scope > div:not([data-content="diamond"]):not([data-content="header-with-image"])'
    );

    const handleIntersection = () => {
      let mostVisibleSection = targetSections?.[0];
      let mostVisibleSectionHeight: number = 0;

      targetSections?.forEach((section) => {
        const { bottom, top } = section.getBoundingClientRect();
        if (top > window.innerHeight || bottom < 0) return;
        const visibleHeight =
          Math.min(window.innerHeight, bottom) - Math.max(0, top);
        if (visibleHeight > mostVisibleSectionHeight) {
          mostVisibleSection = section;
          mostVisibleSectionHeight = visibleHeight;
        }
      });
      if (mostVisibleSection) {
        // Transition background colors
        if (transitionBackground) {
          const intersectingTheme = mostVisibleSection?.getAttribute(
            'data-theme'
          ) as ThemeTypes;
          if (intersectingTheme) {
            setCurrentTheme(intersectingTheme);
          }
        }

        // Animate individual component sections
        if (
          mostVisibleSection.getBoundingClientRect()?.top <=
          window.innerHeight / 2
        ) {
          const animateSections =
            mostVisibleSection.querySelectorAll('[data-animate]');
          animateSections?.forEach((section) => {
            section.setAttribute('data-animate-active', 'true');
          });
        }

        // Also animate diamond line if it's the next sibling
        if (
          mostVisibleSection?.nextElementSibling instanceof HTMLElement &&
          mostVisibleSection?.nextElementSibling?.getAttribute(
            'data-content'
          ) === 'diamond'
        ) {
          const diamondElement =
            mostVisibleSection?.nextElementSibling.querySelector(
              '[data-animate]'
            );
          diamondElement?.setAttribute('data-animate-active', 'true');
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.1, 0.2, 0.3, 0.4, 0.8, 1],
    });
    targetSections?.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      targetSections?.forEach((section) => {
        observer.unobserve(section);
      });
    };
  });

  const pageContent = (
    <div
      className={[styles['main-wrapper'], 'scroll-wrapper'].join(' ')}
      ref={wrapperRef}
    >
      {children}
    </div>
  );

  return transitionBackground ? (
    <Themes theme={currentTheme} topLevelTheme={currentTheme}>
      {pageContent}
    </Themes>
  ) : (
    pageContent
  );
};

export default ScrollTransition;
