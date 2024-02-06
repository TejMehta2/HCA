import React, { useEffect, useRef, useState } from 'react';
import { ScrollTransitionProps } from './ScrollTransition.types';
import styles from './ScrollTransition.module.scss';
import Themes from '../../foundation/Themes/Themes';
import { Theme as ThemeTypes } from '../../foundation/Themes/Themes.types';

const ScrollTransition = (props: ScrollTransitionProps): JSX.Element => {
  const { children, initialTheme = 'F-HCA-White' } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [currentTheme, setCurrentTheme] = useState<ThemeTypes>(initialTheme);

  useEffect(() => {
    const ref = wrapperRef;
    const targetSections =
      wrapperRef?.current?.querySelectorAll(':scope > div');

    const observer = new IntersectionObserver(
      (entries) => {
        //console.log(entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const intersectingTheme = entry.target.getAttribute(
              'data-theme'
            ) as ThemeTypes;
            if (intersectingTheme) {
              setCurrentTheme(intersectingTheme);
            }

            const animateSections =
              entry.target.querySelectorAll('[data-animate]');

            animateSections.forEach((section) => {
              section.setAttribute('data-animate-active', 'true');
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    targetSections?.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Themes theme={currentTheme} topLevelTheme={currentTheme}>
      <div
        className={[styles['main-wrapper'], 'scroll-wrapper'].join(' ')}
        ref={wrapperRef}
      >
        {children}
      </div>
    </Themes>
  );
};

export default ScrollTransition;
