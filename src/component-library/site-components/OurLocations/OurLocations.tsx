import React, { useEffect, useRef, useState, useCallback } from 'react';
import { OurLocationsProps } from './OurLocations.types';
import styles from './OurLocations.module.scss';
import Text from '../../foundation/Text/Text';
import CardMap from '../../components/CardMap/CardMap';
import Themes from '../../foundation/Themes/Themes';
import Image from 'next/image';
import MapEngland from '../../assets/locations/map-england.png';

const OurLocations = (props: OurLocationsProps): JSX.Element => {
  const { subtitle, title, body, cta, locations } = props;

  const [cardShowing, setCardShowing] = useState<number>(0);
  const [mapStyles, setMapStyles] = useState<string>('');
  const [cardStyles, setCardStyles] = useState<string>('');
  const map = useRef<HTMLDivElement>(null);

  /* Each location card shows for the scroll duration of the full height of the viewport */
  /* Adding 1 to length so that last card has room to scroll and doesn't just appear at the last scroll pixel */
  const componentHeight = (locations.length + 1) * 100;

  /* Will still need a lot of refactoring. POC is manually setting 3 cards, but this number cant be guaranteed */
  const handleScroll = useCallback(() => {
    if (!map.current) return;

    /* Positon of map component on the page */
    const mapPosition = map.current.offsetTop;

    /* Full height of map component */
    const mapHeight = map.current.offsetHeight;

    /* Current user position on the page */
    const position = window.scrollY;

    /* height of viewport */
    const viewportHeight = window.innerHeight;

    /* Don't update if component is not within viewport */
    if (position < mapPosition || position > mapHeight + mapPosition) return;

    /* Deterimine which card to show by dividing the full component height by the users current scroll position within the component   */
    let cardToShow = Math.floor((position - mapPosition) / viewportHeight);

    /* Error handling to ensure never exceeds amount of cards in array */
    if (cardToShow >= locations.length) {
      cardToShow = locations.length - 1;
    }

    /* Set id for visible card */
    setCardShowing(cardToShow);
  }, [locations.length]);

  /* Could be custom hook */
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  /* Get CSS styles for map position from props whenever active card changes */
  useEffect(() => {
    /* Get new map styles */
    const mapStylesObj = locations[cardShowing].mapStyles;
    let newMapStyles = '';
    for (const tranformProperty in mapStylesObj) {
      newMapStyles += `${tranformProperty}(${
        mapStylesObj[tranformProperty as keyof typeof mapStylesObj]
      }) `;
    }
    setMapStyles(newMapStyles);

    /* Get new card styles */
    const cardStylesObj = locations[cardShowing].cardStyles;
    let newCardStyles = '';
    for (const tranformProperty in cardStylesObj) {
      newCardStyles += `${tranformProperty}(${
        cardStylesObj[tranformProperty as keyof typeof cardStylesObj]
      }) `;
    }
    setCardStyles(newCardStyles);
  }, [cardShowing, locations]);

  /* Can be separate component */
  /* transform-card-1,2,etc will likely need to be inline styles where the position of the card is set by coordinates from the cms. 
  THIS NEEDS MORE THOUGHT */
  const locationCards = locations.map((location) => {
    return (
      <React.Fragment key={location.id}>
        <div
          className={`${styles.card}  ${
            cardShowing === location.id ? styles.active : ''
          }`}
          style={{ transform: cardStyles }}
        >
          <CardMap
            theme={location.theme}
            amount={
              <Text tag="p" variation="display-1">
                {location.amount}
              </Text>
            }
            title={
              <Text tag="p" variation="heading-2">
                {location.name}
              </Text>
            }
            cta={
              <a href="#">
                <span>
                  View <strong>all</strong>
                </span>
              </a>
            }
          />
        </div>
        {location.area && (
          <div
            className={`${styles.image} ${styles.region} ${
              cardShowing === location.id ? styles.active : ''
            }`}
          >
            <Image
              src={location.area}
              alt="a map of England with the current region highlighted"
              width={913}
              height={1069}
              style={{ transform: mapStyles }}
            />
          </div>
        )}
      </React.Fragment>
    );
  });

  return (
    <Themes theme="I-HCA-Turquoise-20">
      <div
        ref={map}
        className={styles.wrapper}
        style={{ height: componentHeight + 'vh' }}
      >
        <div className={styles['map-wrapper']}>
          {/* Left side static text */}
          <div className={styles['static-text']}>
            <div>
              {subtitle}
              {title}
            </div>
            {body}
            {cta}
          </div>

          {/* Image / SVG Map */}
          {/* transform-image-1,2,etc will likely need to be inline styles where the position of the card is set by coordinates from the cms. */}
          <div className={styles.image}>
            <Image
              src={MapEngland}
              alt="a map of England with region borders"
              width={913}
              height={1069}
              style={{ transform: mapStyles }}
            />
          </div>

          {/* Cards */}
          {locationCards}
        </div>
      </div>
    </Themes>
  );
};

export default OurLocations;
