import React, { useRef, useState, useEffect } from 'react';
import { StickyCTAProps } from './StickyCTA.types';
import styles from './StickyCTA.module.scss';
import Themes from '../../foundation/Themes/Themes';

const StickyCTA = (props: StickyCTAProps): JSX.Element => {
  const { children, cta, theme } = props;
  const [overlapping, setOverlapping] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //  Hide the component until the user has started scrolling
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setShowComponent(true);
      } else {
        setShowComponent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    //  Hide the component if intersecting with the footer
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

      // Cleanup
      return () => {
        observer.unobserve(footer);
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
      };
    }

    return undefined;
  }, []);

  return (
    <Themes theme={theme || "B-HCA-Navy-Blue"}>
      <div
        className={[
          styles.wrapper,

          showComponent && !overlapping ? styles.visible : styles.hidden,
        ].join(' ')}
        ref={stickyRef}
      >
        <div className={styles.content}>{children}</div>
        {cta && <div className={styles.cta}>{cta}</div>}
      </div>
    </Themes>
  );
};

export default StickyCTA;
