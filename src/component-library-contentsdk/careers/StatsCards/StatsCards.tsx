import React, { useEffect, useRef, useCallback, useState, type JSX } from 'react';
import { StatsCardsProps } from './StatsCards.types';
import styles from './StatsCards.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Text from '../../foundation/Text/Text';

const StatsCards = (props: StatsCardsProps): JSX.Element => {
  const {
    theme = 'A-HCA-White',
    id,
    header,
    subheader,
    bodyCopy,
    stats,
    tableOfContentTitle
  } = props;

  const [started, setStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const splitString = (input: string): { numbers: string; letters: string } => {
    const numbers = input.replace(/\D/g, ''); // Remove non-digit characters
    const letters = input.replace(/\d/g, ''); // Remove digit characters

    return { numbers, letters };
  };

  const counter = useCallback((element: HTMLElement) => {
    if (!element.textContent || !element.dataset.counter) return;

    // Speed that all counters animate
    const duration = 2000;

    // Get start and end values
    const start = parseInt(element.textContent, 10);
    const end = parseInt(element.dataset.counter, 10);

    // If equal values, stop here
    if (start === end) return;

    // Get the range
    const range = end - start;

    // Set current at start position
    let current = start;

    const timeStart = Date.now();

    const loop = () => {
      let elaps = Date.now() - timeStart;

      // Stop the loop
      if (elaps > duration) elaps = duration;

      // normalised value + easing
      const norm = elaps / duration;

      // Calculate the value step
      const step = norm * range;

      // Increment or Decrement current value
      current = start + step;

      // Apply to element as integer
      element.textContent = Math.trunc(current).toString();

      // Loop
      if (elaps < duration) requestAnimationFrame(loop);
    };

    // Start the loop
    requestAnimationFrame(loop);
  }, []);

  const handleScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && started === false) {
        setStarted(true);
        const stats = statsRef.current?.querySelectorAll('[data-counter]');
        if (!stats) return;

        Array.from(stats).forEach(counter);
      }
    },
    [started, counter]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion)');
      setIsReducedMotion(mediaQuery.matches);
    }

    if (isReducedMotion) return;

    const observer = new IntersectionObserver(handleScroll, { threshold: 0 });
    const currentRef = statsRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleScroll, statsRef, isReducedMotion]);

  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.text} data-animate="xs">
            <div>{subheader}</div>
            <div className={styles['header']}>{header}</div>
            <div className={styles['body-copy']}>{bodyCopy}</div>
          </div>
          <div className={styles.stats} ref={statsRef} data-animate="m">
            {stats.map((stat, index) => {
              const splitStat = splitString(stat.stat);

              return (
                <div key={index} className={styles.stat}>
                  <Text tag="p" variation="display-1">
                    <span data-counter={splitStat.numbers}>
                      {isReducedMotion ? splitStat.numbers : 0}
                    </span>
                    {splitStat.letters}
                  </Text>
                  <Text tag="p" variation="body-large">
                    {stat.text}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default StatsCards;
