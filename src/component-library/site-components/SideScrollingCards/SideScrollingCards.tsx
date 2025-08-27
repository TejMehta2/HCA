import React, { useEffect, useState, useRef } from 'react';
import { SideScrollingCardsProps } from './SideScrollingCards.types';
import styles from './SideScrollingCards.module.scss';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import useActiveElement from '../../hooks/useActiveElement';
import Themes from '../../foundation/Themes/Themes';
import { useDebouncedCallback } from 'use-debounce';

const SideScrollingCards = (props: SideScrollingCardsProps): JSX.Element => {
  const { title, bodyCopy, link, children, id, tableOfContentTitle } = props;
  const [translateX, setTranslateX] = useState<number>();
  const [height, setHeight] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const introBlock = useRef<HTMLDivElement>(null);
  const cardsBlock = useRef<HTMLDivElement>(null);

  const focusedCta = useActiveElement();

  /* Keyboard navigation. Using a keyboard to tab through CTAs must also adjust the scroll postion to show the correct card */
  useEffect(() => {
    if (
      !focusedCta ||
      !focusedCta.parentElement ||
      !containerRef.current ||
      !containerRef.current.parentElement ||
      !containerRef.current.contains(focusedCta)
    )
      return;

    /* Get width and sibling index */
    const cardWidth = focusedCta.parentElement.offsetWidth;

    /* Create array from all the patient story cards */
    const patientStories = Array.from(cardsBlock.current!.children);

    /* Prepend intro block so that all side scrolling elements are in the same array */
    const sideScrollCards = [introBlock.current, ...patientStories];

    let siblingNumber = 0;

    /* Loop through array and find the element which contains the focused cta and get its index */
    sideScrollCards.forEach((item, index) => {
      if (item?.contains(focusedCta)) {
        siblingNumber = index;
      }
    });

    /* Get start point of whole component from the very top of the page */
    const componentScrollStart = containerRef.current.parentElement.offsetTop;

    /* Get bottom of the whole component*/
    const componentScrollEnd =
      componentScrollStart + containerRef.current.parentElement.offsetHeight;

    /* Get scroll position for focused element by multiplying the individual card width by the index */
    const scrollTo = componentScrollStart + cardWidth * siblingNumber;

    /* Don't adjust scroll if it will take the user out of the bounds of the component */
    if (scrollTo < componentScrollStart || scrollTo > componentScrollEnd) {
      return;
    }

    /* scroll to position */
    window.scroll(0, scrollTo);
  }, [focusedCta]);

  const scrollHandler = () => {
    if (!containerRef.current) return;
    /* Positon of component on the page */
    const componentPosition = containerRef.current.offsetTop;

    if (componentPosition === 0) {
      /* Without this I was getting some cases where it would get stuck at 6px when scrolling back up. 
      This seems to fix it, but could be worth looking further into it to find a better solution */
      setTranslateX(0);
    } else {
      setTranslateX(componentPosition);
    }
  };

  /* Debounce so that resizing screen doesn't cause function to run more times than necessary */
  const sideScrollSetup = useDebouncedCallback(() => {
    if (!containerRef.current) return;

    setHeight(
      containerRef.current.scrollWidth -
      containerRef.current.offsetWidth +
      containerRef.current.offsetHeight
    );
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
  }, 100);

  /* Handle height of component. This will update whenever screen size changes */
  useEffect(() => {
    sideScrollSetup();

    /* Rerun setup for side scrolling on resize as the height and translateX will need to update */
    window.addEventListener('resize', sideScrollSetup);
    return () => window.removeEventListener('resize', sideScrollSetup);
  }, [sideScrollSetup]);

  return (
    <Themes theme="J-HCA-Tangerine-20" id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles['wrapper']} style={{ height: `${height}px` }}>
        <div
          ref={containerRef}
          className={styles['side-scroll-section']}
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          <div ref={introBlock} className={styles['intro']}>
            <div className={styles['intro-text']}>
              <Text variation="display-2" tag="h2">
                {title}
              </Text>
              <Text tag="span" variation="body-large">
                {bodyCopy}
              </Text>
            </div>
            <Button size="large" variation="outline-dark">
              {link}
            </Button>
          </div>
          <div ref={cardsBlock} className={styles['cards']}>
            {children}
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default SideScrollingCards;
