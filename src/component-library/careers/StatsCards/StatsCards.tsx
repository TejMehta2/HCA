import React, { useEffect, useRef, useCallback, useState } from 'react';
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
  } = props;

  const [started, setStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const splitString = (input: string): { numbers: string; letters: string } => {
    const numbers = input.replace(/\D/g, ''); // Remove non-digit characters
    const letters = input.replace(/\d/g, ''); // Remove digit characters

    return { numbers, letters };
  };

  const counter = useCallback((Element: HTMLSpanElement) => {
    // Animate all counters equally for a better UX
    const duration = 2000;

    // Get start and end values
    const start = parseInt(Element.textContent!, 10);
    const end = parseInt(Element.dataset.counter!, 10);

    // If equal values, stop here
    if (start === end) return;

    // Get the range
    const range = end - start;

    // Set current at start position
    let current = start;

    const timeStart = Date.now();

    const loop = () => {
      let elaps = Date.now() - timeStart;
      if (elaps > duration) elaps = duration; // Stop the loop
      const norm = elaps / duration; // normalised value + easing
      const step = norm * range; // Calculate the value step
      current = start + step; // Increment or Decrement current value
      Element.textContent = Math.trunc(current).toString(); // Apply to UI as integer
      if (elaps < duration) requestAnimationFrame(loop); // Loop
    };

    requestAnimationFrame(loop); // Start the loop!
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
  }, [handleScroll, statsRef]);

  return (
    <>
      <div className={styles['dummy-component']}>
        <Text variation="display-1">EXAMPLE PREVIOUS COMPONENT</Text>
      </div>
      <Themes theme={theme} id={id}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.text}>
              <div>{subheader}</div>
              <div className={styles['header']}>{header}</div>
              <div className={styles['body-copy']}>{bodyCopy}</div>
            </div>
            <div className={styles.stats} ref={statsRef}>
              {stats.map((stat, index) => {
                const splitStat = splitString(stat.stat);

                return (
                  <div key={index} className={styles.stat}>
                    <Text tag="p" variation="display-1">
                      <span data-counter={splitStat.numbers}>0</span>
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
      <div className={styles['dummy-component']}>
        <Text variation="display-1">EXAMPLE PREVIOUS COMPONENT</Text>
      </div>
    </>
  );
};

export default StatsCards;
