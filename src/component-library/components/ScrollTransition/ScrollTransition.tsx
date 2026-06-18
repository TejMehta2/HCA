import React, { useEffect, useRef, useState } from 'react';
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
    const targetSections = Array.from(
      wrapperRef.current?.querySelectorAll<HTMLElement>(
        ':scope > div:not([data-content="diamond"]):not([data-content="header-with-image"])'
      ) ?? []
    );

    let animationFrame: number | null = null;

    const updateCurrentSection = () => {
      let mostVisibleSection: any = null;
      let mostVisibleSectionHeight = 0;

      targetSections.forEach((section: any) => {
        const { bottom, top } = section.getBoundingClientRect();

        if (top > window.innerHeight || bottom < 0) return;

        const visibleHeight =
          Math.min(window.innerHeight, bottom) - Math.max(0, top);

        if (visibleHeight > mostVisibleSectionHeight) {
          mostVisibleSection = section;
          mostVisibleSectionHeight = visibleHeight;
        }
      });

      if (!mostVisibleSection) return;

      // Transition background colors
      if (transitionBackground) {
        const intersectingTheme = mostVisibleSection.getAttribute(
          'data-theme'
        ) as ThemeTypes | null;

        if (intersectingTheme) {
          setCurrentTheme(intersectingTheme);
        }
      }

      // Animate individual component sections
      if (mostVisibleSection.getBoundingClientRect().top <= window.innerHeight / 2) {
        const animateSections =
          mostVisibleSection.querySelectorAll('[data-animate]');

        animateSections.forEach((section: any) => {
          section.setAttribute('data-animate-active', 'true');
        });
      }

      // Also animate diamond line if it's the next sibling
      const nextElement = mostVisibleSection.nextElementSibling;

      if (
        nextElement instanceof HTMLElement &&
        nextElement.getAttribute('data-content') === 'diamond'
      ) {
        const diamondElement = nextElement.querySelector('[data-animate]');
        diamondElement?.setAttribute('data-animate-active', 'true');
      }
    };

    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        updateCurrentSection();
        animationFrame = null;
      });
    };

    updateCurrentSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [transitionBackground, children]);

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
