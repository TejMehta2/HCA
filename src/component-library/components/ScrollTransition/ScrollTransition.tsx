import React, { useEffect, useRef, useState } from 'react';
import { ScrollTransitionProps } from './ScrollTransition.types';
import styles from './ScrollTransition.module.scss';
import Themes from '../../foundation/Themes/Themes';
import { Theme as ThemeTypes } from '../../foundation/Themes/Themes.types';

const ScrollTransition = (props: ScrollTransitionProps): JSX.Element => {
  const { children, initialTheme } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [currentTheme, setCurrentTheme] = useState<ThemeTypes>(initialTheme);

  useEffect(() => {
    const targetSections = wrapperRef?.current?.querySelectorAll('& > div');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const intersectingTheme = entry.target.getAttribute('data-theme');
            if (intersectingTheme) {
              setCurrentTheme(intersectingTheme);
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    targetSections?.forEach((section) => {
      observer.observe(section);
    });
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
