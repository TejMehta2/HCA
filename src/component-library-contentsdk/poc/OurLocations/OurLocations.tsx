import React, { useEffect, useRef, useState, useCallback, type JSX } from 'react';
import { OurLocationsProps } from './OurLocations.types';
import styles from './OurLocations.module.scss';
import Themes from '../../foundation/Themes/Themes';
import OurLocationsRegion, {
  RegionImage,
} from '../OurLocationsRegion/OurLocationsRegion';
import MapEngland from '../../assets/locations/map-england.png';

const OurLocations = (props: OurLocationsProps): JSX.Element => {
  const { subtitle, title, body, cta, locations } = props;

  const [cardShowing, setCardShowing] = useState<number>(0);
  const [mobileScrolled, setMobileScrolled] = useState<boolean>(false);
  const map = useRef<HTMLDivElement>(null);

  /* Each location card shows for the scroll duration of the full height of the viewport */
  /* Adding 1 to length so that last card has room to scroll and doesn't just appear at the last scroll pixel */
  const componentHeight = (locations.length + 1) * 100;

  /* Keyboard navigation. Using a keyboard to tab through CTAs must also adjust the scroll postion to show the correct location */
  const focusHandler = (focusId: number) => {
    if (!map.current) return;

    /* height of viewport */
    const viewportHeight = window.innerHeight;

    /* Positon of map component on the page */
    const mapPosition = map.current.offsetTop;

    /* Determine scroll position by multiplying the cardId by the viewport height and then adding the vertical position of the component
    +1 is used to avoid cases where the viewport height is a decimal and the correct card doesn't get shown */
    const scrollTo = viewportHeight * focusId + mapPosition + 1;

    /* Scroll to card position. Scroll handler will then automatically display it */
    window.scroll(0, scrollTo);
  };

  /* Determine which location to show based on the scroll position */
  const scrollHandler = useCallback(() => {
    if (!map.current) return;

    /* Positon of map component on the page */
    const mapPosition = map.current.offsetTop;

    /* Full height of map component */
    const mapHeight = map.current.offsetHeight;

    /* Current user position on the page */
    const position = window.scrollY;

    /* Height of viewport */
    const viewportHeight = window.innerHeight;

    /* Don't update if component is not within viewport */
    if (position < mapPosition || position > mapHeight + mapPosition) return;

    /* Deterimine which card to show by dividing the full component height by the users current scroll position within the component. 
    This is then rounded down so that it can be compared with the key number in the locations array */
    let cardToShow = Math.floor((position - mapPosition) / viewportHeight);

    /* Error handling to ensure never exceeds amount of cards in array */
    if (cardToShow >= locations.length) {
      cardToShow = locations.length - 1;
    }

    /* For mobile. Header text section only appears when at top of component, then slides up once user starts scrolling */
    setMobileScrolled(position - mapPosition >= 10);

    /* Set id for visible card */
    setCardShowing(cardToShow);
  }, [locations.length]);

  /* Run scroll function */
  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  /* Generate location cards and coloured map regions */
  const locationCards = locations.map((location, index) => {
    return (
      <OurLocationsRegion
        key={index}
        {...location}
        cardStyles={locations[cardShowing].cardStyles}
        mapStyles={locations[cardShowing].mapStyles}
        activeRegion={cardShowing === index}
        onFocus={focusHandler}
      />
    );
  });

  /* Theme will always be turquoise (it's the colour of the sea) */
  return (
    <Themes theme="L-HCA-Teal-5">
      <div
        ref={map}
        className={styles.wrapper}
        style={{
          // consumed in the CSS to set height of component (desktop only)
          ['--component-height' as string]: `${componentHeight}vh`,
        }}
      >
        <div className={styles.container}>
          {/* Header Section */}
          <div
            className={`${styles.header} ${mobileScrolled ? styles.hide : ''}`}
            data-animate="m"
          >
            <div>
              {subtitle}
              {title}
            </div>
            {body}
            {cta}
          </div>

          {/* Country Map */}
          <RegionImage
            src={MapEngland.src}
            alt="a map of England with region borders"
            classNames={styles.desktop}
            imgStyle={locations[cardShowing].mapStyles}
          />

          {/* Cards */}
          {locationCards}
        </div>
      </div>
    </Themes>
  );
};

export default OurLocations;
