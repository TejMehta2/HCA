import React, { useEffect, useRef } from 'react';
import { OurLocationsProps } from './OurLocations.types';
import styles from './OurLocationsMobile.module.scss';
import Themes from '../../foundation/Themes/Themes';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';
import MapImage from './our-locations-map.png';
import MapPin from './pin.svg';
import Image from 'next/image';

const OurLocationsMobile = (props: OurLocationsProps): JSX.Element => {
  const {
    headerProps,
    locations = [],
    mapImage = <Image src={MapImage} alt="" />,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollHandler = () => {
      const children = containerRef?.current?.children;
      if (!children?.length) return;
      const childArray = [...children];
      childArray.forEach((child: HTMLDivElement, index: number) => {
        if (index === 1) return; // skip first map section
        const { top: childTop, height: childHeight } =
          child.getBoundingClientRect();
        const childMiddle = childHeight / 2 + childTop;
        if (childTop <= 0) {
          // Element above viewport
          child.classList.add(styles.above);
          child.classList.remove(styles.below);
        } else if (childMiddle >= window.innerHeight) {
          // Element below viewport
          child.classList.add(styles.below);
          child.classList.remove(styles.above);
        } else {
          child.classList.remove(styles.below);
          child.classList.remove(styles.above);
        }
      });
    };

    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [locations.length]);

  const animatedChildren = [
    <div key={0} className={styles.header}>
      <AdvancedBlockHeader paddingSize={'none'} {...headerProps} />
    </div>,
    ...locations.map((location, locationIndex) => (
      <div key={locationIndex + 1} className={styles.location}>
        <Themes theme={location.theme}>
          <div
            className={styles.map}
            style={{
              // consumed in the CSS to set height of component (desktop only)
              ['--map-scale' as string]: locations?.[locationIndex]?.mapScale,
              ['--map-x' as string]: locations?.[locationIndex]?.mapX,
              ['--map-y' as string]: locations?.[locationIndex].mapY,
            }}
          >
            <div className={styles['map-inner']}>
              {mapImage}
              {locations.map((nestedLocation, nestedIndex) => {
                if (nestedIndex === 0)
                  return <React.Fragment key={nestedIndex}></React.Fragment>;
                return (
                  <React.Fragment key={nestedIndex}>
                    <div
                      style={{
                        // consumed in the CSS to set height of component (desktop only)
                        ['--pin-x' as string]:
                          Math.floor(nestedLocation.mapX * 1000) / 1000,
                        ['--pin-y' as string]:
                          Math.floor(nestedLocation.mapY * 1000) / 1000,
                      }}
                      className={[
                        styles.pin,
                        nestedIndex === locationIndex ? styles.active : '',
                      ].join(' ')}
                    >
                      <MapPin />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className={styles.card}>{location.card}</div>
        </Themes>
      </div>
    )),
  ];
  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.container}>
        {animatedChildren.map((child) => {
          return child;
        })}
      </div>
    </div>
  );
};

export default OurLocationsMobile;
