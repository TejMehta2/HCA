import React, { useRef, useState, useEffect } from 'react';
import { StickyCTAProps } from './StickyCTA.types';
import styles from './StickyCTA.module.scss';
import Themes from '../../foundation/Themes/Themes';

const StickyCTA = (props: StickyCTAProps): JSX.Element => {
  const { children, cta } = props;

  const [overlapping, setOverlapping] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = document.getElementById('footer');

    if (footer) {
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOverlapping(true);
          } else {
            setOverlapping(false);
          }
        });
      };

      const observerOptions = {
        root: null,
        threshold: [0.1],
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );
      observer.observe(footer);

      // Cleanup function to unobserve and disconnect the observer
      return () => {
        observer.unobserve(footer);
        observer.disconnect();
      };
    }

    return undefined;
  }, []);

  return (
    <Themes theme="B-HCA-Navy-Blue">
      <div
        className={[styles.wrapper, overlapping ? styles.hidden : ''].join(' ')}
        ref={stickyRef}
      >
        <div className={styles.content}>{children}</div>
        {cta && <div className={styles.cta}>{cta}</div>}
      </div>
    </Themes>
  );
};

export default StickyCTA;
