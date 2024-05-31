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
    const ref = wrapperRef;
    const targetSections = wrapperRef?.current?.querySelectorAll(
      ':scope > div:not([data-content="diamond"])'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (transitionBackground) {
              const intersectingTheme = entry.target.getAttribute(
                'data-theme'
              ) as ThemeTypes;
              if (intersectingTheme) {
                setCurrentTheme(intersectingTheme);
              }
            }

            /* Animate individual component sections */
            const animateSections =
              entry.target.querySelectorAll('[data-animate]');

            animateSections.forEach((section) => {
              section.setAttribute('data-animate-active', 'true');
            });

            /* Also animate diamond line if it's the next sibling */
            if (
              entry.target.nextElementSibling instanceof HTMLElement &&
              entry.target.nextElementSibling?.getAttribute('data-content') ===
                'diamond'
            ) {
              const diamondElement =
                entry.target.nextElementSibling.querySelector('[data-animate]');
              diamondElement?.setAttribute('data-animate-active', 'true');
            }
          }
        });
      },
      { threshold: 0.51, rootMargin: '10%' }
    );
    targetSections?.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [transitionBackground]);

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
