import React, { useEffect, useRef, useState } from 'react';
import { ScrollTransitionProps } from './ScrollTransition.types';
import styles from './ScrollTransition.module.scss';
import Themes from '../../foundation/Themes/Themes';

const ScrollTransition = (props: ScrollTransitionProps): JSX.Element => {
  const { children } = props;

  const wrapperRef = useRef(null as HTMLElement | null);

  const [currentTheme, setCurrentTheme] = useState('');

  useEffect(() => {
    const targetSections = wrapperRef?.current.querySelectorAll('& > div');
    // targetSections.forEach((section) => {
    //   section.removeAttribute('class');
    // });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target.getAttribute('data-theme'));
          const intersectingTheme = entry.target.getAttribute('data-theme');
          setCurrentTheme(intersectingTheme);
        }
      });
    });
    targetSections.forEach((section) => {
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
