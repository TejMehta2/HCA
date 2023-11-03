import React, { useEffect, useRef, useState } from 'react';
import styles from './_MapAnimation.module.scss';
import Text from '../../foundation/Text/Text';

const MapAnimation = (): JSX.Element => {
  const [cardShowing, setCardShowing] = useState<number>();
  const map = useRef<HTMLDivElement>();

  /* mock data */
  const locations = [
    { id: 1, name: 'london' },
    { id: 2, name: 'manchester' },
    { id: 3, name: 'birmingham' },
  ];

  /* Will still need a lot of refactoring. POC is manually setting 3 cards, but this number cant be guaranteed */
  const handleScroll = () => {
    /* Positon of map component on the page */
    const mapPosition = map.current.offsetTop;

    /* Current user position on the page */
    const position = window.scrollY;

    /* TODO refactor to loop through array and get id */
    const card1Position = mapPosition + 100;
    const card2Position = mapPosition + 500;
    const card3Position = mapPosition + 900;

    if (card1Position < position && position < card2Position) {
      setCardShowing(1);
    } else if (card2Position < position && position < card3Position) {
      setCardShowing(2);
    } else if (card3Position < position) {
      setCardShowing(3);
    } else {
      setCardShowing(0);
    }
  };

  /* Could be custom hook */
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* Can be separate component */
  /* transform-card-1,2,etc will likely need to be inline styles where the position of the card is set by coordinates from the cms. 
  THIS NEEDS MORE THOUGHT */
  const locationCards = locations.map((location) => {
    return (
      <div
        key={location.id}
        className={`${styles.card} ${styles[`transform-card-${cardShowing}`]} ${
          cardShowing === location.id ? styles.active : ''
        }`}
      >
        <Text variation="display-5">{location.name}</Text>
      </div>
    );
  });

  return (
    <div>
      <div className={styles['dummy-component']}>
        <Text variation="display-1">EXAMPLE PREVIOUS COMPONENT</Text>
      </div>

      <div ref={map} className={styles['map-comp']}>
        <div className={styles['map-wrapper']}>
          {/* Left side static text */}
          <div>
            <Text variation="display-3">
              The widest range of locations in the UK
            </Text>
          </div>

          {/* Image / SVG Map */}
          {/* transform-image-1,2,etc will likely need to be inline styles where the position of the card is set by coordinates from the cms. */}
          <div className={styles.image}>
            <img
              src="https://picsum.photos/1000/800"
              alt="dummy image"
              className={styles[`transform-image-${cardShowing}`]}
            />
          </div>

          {/* Cards */}
          <div>{locationCards}</div>
        </div>
      </div>

      <div className={styles['dummy-component']}>
        <Text variation="display-1">EXAMPLE NEXT COMPONENT</Text>
      </div>
    </div>
  );
};

export default MapAnimation;
