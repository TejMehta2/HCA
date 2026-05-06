import React, { useEffect, useState, useRef } from 'react';
import styles from './_SideScrolling.module.scss';
import Text from '../../foundation/Text/Text';

const SideScrolling = (): JSX.Element => {
  const [translateX, setTranslateX] = useState<number>();
  const [height, setHeight] = useState<number>();
  const ref = useRef<HTMLDivElement>();

  const cardList = [
    { id: 1, title: 'Every new birth tells its own story' },
    { id: 2, title: 'Every new birth tells its own story' },
    { id: 3, title: 'Every new birth tells its own story' },
    { id: 4, title: 'Every new birth tells its own story' },
    { id: 5, title: 'Every new birth tells its own story' },
  ];

  /* Handle keyboard navigation when button gains focus */
  const focusHandler = (e) => {
    const focusedCta = e.target as HTMLButtonElement;

    /* Get width and sibling index */
    const cardWidth = focusedCta.parentElement.offsetWidth;
    const siblingNumber = Array.from(ref.current.children).indexOf(
      focusedCta.parentElement
    );

    /* Get start point of whole component from the very top of the page */
    const componentScrollStart = ref.current.parentElement.offsetTop;

    /* Get bottom of the whole component*/
    const componentScrollEnd =
      componentScrollStart + ref.current.parentElement.offsetTop;

    /* Get scroll position for focused element by multiplying the individual card width by the index */
    const scrollTo = componentScrollStart + cardWidth * siblingNumber;

    /* Don't adjust scroll if it will take the user out of the bounds of the component */
    if (scrollTo < componentScrollStart || scrollTo > componentScrollEnd) {
      return;
    }

    /* scroll to position */
    window.scroll(0, scrollTo);
  };

  const scrollHandler = () => {
    /* Positon of component on the page */
    const componentPosition = ref.current.offsetTop;

    if (componentPosition === 0) {
      /* Without this I was getting some cases where it would get stuck at 6px when scrolling back up. 
      This seems to fix it, but could be worth looking further into it to find a better solution */
      setTranslateX(0);
    } else {
      setTranslateX(componentPosition);
    }
  };

  /* Could be custom hook */
  useEffect(() => {
    setHeight(
      ref.current.scrollWidth -
        ref.current.offsetWidth +
        ref.current.offsetHeight
    );
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const cards = cardList.map((card) => {
    return (
      <div key={card.id} className={styles.card}>
        <Text variation="display-4">{card.title}</Text>
        <button onFocus={focusHandler}>Read the story</button>
      </div>
    );
  });

  return (
    <div>
      <div className={styles['dummy-component']}>
        <Text variation="display-1">EXAMPLE PREVIOUS COMPONENT</Text>
      </div>

      <div className={styles['dummy-component']}>
        <Text variation="display-1">EXAMPLE PREVIOUS COMPONENT</Text>
      </div>

      <div className={styles['wrapper']} style={{ height: `${height}px` }}>
        <div
          ref={ref}
          className={styles['side-scroll-section']}
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          <div className={styles.card}>
            <Text variation="display-2">Stories from our patients</Text>
          </div>
          {cards}
        </div>
      </div>

      <div className={styles['dummy-component']}>
        <Text variation="display-1">EXAMPLE NEXT COMPONENT</Text>
        <button>test next component</button>
      </div>
    </div>
  );
};

export default SideScrolling;
