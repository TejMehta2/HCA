import React, { useEffect, useRef, useState, useCallback } from 'react';
import { OurLocationsProps } from './OurLocations.types';
import styles from './OurLocations.module.scss';
import Text from '../../foundation/Text/Text';
import CardMap from '../../components/CardMap/CardMap';
import Themes from '../../foundation/Themes/Themes';
import Image from 'next/image';
import MapEngland from '../../assets/locations/map-england.png';
import useWindowWidth from '../../hooks/useWindowWidth';
import useActiveElement from '../../hooks/useActiveElement';

const OurLocations = (props: OurLocationsProps): JSX.Element => {
  const { subtitle, title, body, cta, locations } = props;

  const [cardShowing, setCardShowing] = useState<number>(0);
  const [mapStyles, setMapStyles] = useState<string>('');
  const [cardStyles, setCardStyles] = useState<string>('');
  const [mobileScrolled, setMobileScrolled] = useState<boolean>(false);
  const map = useRef<HTMLDivElement>(null);

  const isL = useWindowWidth(1135);
  const focusedCta = useActiveElement();

  /* Each location card shows for the scroll duration of the full height of the viewport */
  /* Adding 1 to length so that last card has room to scroll and doesn't just appear at the last scroll pixel */
  const componentHeight = (locations.length + 1) * 100;

  /* Keyboard navigation. Using a keyboard to tab through CTAs must also adjust the scroll postion to show the correct location */
  useEffect(() => {
    if (
      !focusedCta ||
      !focusedCta.parentElement ||
      !map.current ||
      !map.current.parentElement ||
      !map.current.contains(focusedCta)
    )
      return;

    /* Get id of card to know which one needs to be shown */
    const focusedCardId = focusedCta.getAttribute('card-id') || 0;

    /* height of viewport */
    const viewportHeight = window.innerHeight;

    /* Positon of map component on the page */
    const mapPosition = map.current.offsetTop;

    /* Determine scroll position by multiplying the cardId by the viewport height and then adding the vertical position of the component
    +1 is used to avoid cases where the viewport height is a decimal and the correct card doesn't get shown */
    const scrollTo = viewportHeight * +focusedCardId + mapPosition + 1;

    /* Scroll to card position. Scroll handler will then automatically display it */
    window.scroll(0, scrollTo);
  }, [focusedCta]);

  /* Determine which location to show based on the scroll position */
  const handleScroll = useCallback(() => {
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
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  /* Convert tranformation styles object to a css string */
  const getStylesString = useCallback(<T,>(stylesObj: T) => {
    let newMapStyles = '';
    for (const tranformProperty in stylesObj) {
      newMapStyles += `${tranformProperty}(${
        stylesObj[tranformProperty as keyof typeof stylesObj]
      }) `;
    }
    return newMapStyles;
  }, []);

  /* Get CSS styles for map position from props whenever active card changes */
  useEffect(() => {
    /* Get new map styles */
    const newMapStyles = getStylesString(locations[cardShowing].mapStyles);
    setMapStyles(newMapStyles);

    /* Get new card styles */
    const newCardStyles = getStylesString(locations[cardShowing].cardStyles);
    setCardStyles(newCardStyles);
  }, [cardShowing, locations, getStylesString]);

  /* Create image */
  const generateImage = (src: string, alt: string, style = {}) => {
    return (
      <Image src={src} alt={alt} width={913} height={1069} style={style} />
    );
  };

  /* Generate location cards and coloured map regions */
  const locationCards = locations.map((location) => {
    return (
      <React.Fragment key={location.id}>
        {/* On desktop. Generate region image */}
        {location.area.desktop && (
          <div
            className={`${styles.image} ${styles.region} ${
              cardShowing === location.id ? styles.active : ''
            }`}
          >
            {generateImage(
              location.area.desktop,
              'a map of England with the current region highlighted',
              isL ? { transform: mapStyles } : {}
            )}
          </div>
        )}

        {/* Generate location card and mobile version of region map */}
        <div
          className={`${styles['card-container']} ${
            cardShowing === location.id ? styles.active : ''
          }`}
          style={isL ? { transform: cardStyles } : {}}
        >
          {location.area && (
            <div className={`${styles.image} ${styles.mobile}`}>
              {generateImage(
                location.area.mobile,
                'a map of England with the current region highlighted'
              )}
            </div>
          )}
          <div className={`${styles.card}`}>
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
                <a href="#" card-id={location.id}>
                  <span>
                    View <strong>all</strong>
                  </span>
                </a>
              }
            />
          </div>
        </div>
      </React.Fragment>
    );
  });

  /* Theme will always be turquoise (it's the colour of the sea) */
  return (
    <Themes theme="I-HCA-Turquoise-20">
      <div
        ref={map}
        className={styles.wrapper}
        style={isL ? { height: componentHeight + 'vh' } : {}}
      >
        <div className={styles.container}>
          {/* Header Section */}
          <div
            className={`${styles.header} ${mobileScrolled ? styles.hide : ''}`}
          >
            <div>
              {subtitle}
              {title}
            </div>
            {body}
            {cta}
          </div>

          {/* Country Map */}
          <div className={styles.image}>
            {generateImage(
              MapEngland,
              'a map of England with region borders',
              isL ? { transform: mapStyles } : { display: 'none' }
            )}
          </div>

          {/* Cards */}
          {locationCards}
        </div>
      </div>
    </Themes>
  );
};

export default OurLocations;
