import React, { useEffect, useRef, useState } from 'react';
import { OurLocationsProps } from './OurLocations.types';
import styles from './OurLocationsDesktop.module.scss';
import Themes from '../../foundation/Themes/Themes';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';
import MapImage from './our-locations-map.png';
import MapPin from './pin.svg';
import Image from 'next/image';

const OurLocationsDesktop = (props: OurLocationsProps): JSX.Element => {
  const {
    headerProps,
    locations = [],
    scrollSensitivity = 60,
    mapImage = <Image src={MapImage} alt="" />,
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      const wrapper = wrapperRef.current;
      const container = containerRef.current;
      if (!wrapper || !container) return;
      const { top: wrapperTop, height: wrapperHeight } =
        wrapper.getBoundingClientRect();
      const { height: containerHeight } = container.getBoundingClientRect();
      const scrollableDistance = wrapperHeight - containerHeight; // (px)
      const distanceScrolled = Math.max(-1 * wrapperTop, 0); // (px)

      if (distanceScrolled >= scrollableDistance) return;

      const relativeDistanceScrolled = Math.min(
        distanceScrolled / scrollableDistance,
        1
      ); // (ratio)
      const newStep = Math.floor(relativeDistanceScrolled * locations.length); // (steps)
      const limitedNewStep = Math.min(newStep, locations.length - 1);
      setStep(limitedNewStep);
    };

    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [locations.length]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{
        // consumed in the CSS to set height of component (desktop only)
        ['--component-height' as string]: `${
          100 + locations.length * scrollSensitivity
        }vh`,
      }}
    >
      <div ref={containerRef} className={styles.container}>
        <div className={styles.header}>
          <AdvancedBlockHeader {...headerProps} paddingSize="none" />
        </div>
        <div className={styles.cards}>
          {locations.map((location, index) => (
            <div
              key={index}
              className={[
                styles.card,
                index === step ? styles.active : '',
              ].join(' ')}
            >
              <Themes theme={location.theme}>{location.card}</Themes>
            </div>
          ))}
        </div>
        <div
          className={styles.map}
          style={{
            // consumed in the CSS to set height of component (desktop only)
            ['--map-scale' as string]: locations?.[step]?.mapScale,
            ['--map-x' as string]:
              Math.floor(locations?.[step]?.mapX * 1000) / 1000,
            ['--map-y' as string]:
              Math.floor(locations?.[step]?.mapY * 1000) / 1000,
          }}
        >
          <div className={styles['map-inner']}>
            {mapImage}
            {locations.map((location, index) => {
              if (index === 0)
                return <React.Fragment key={index}></React.Fragment>;
              return (
                <React.Fragment key={index}>
                  <Themes theme={location.theme}>
                    <div
                      style={{
                        // consumed in the CSS to set height of component (desktop only)
                        ['--pin-x' as string]:
                          Math.floor(location.mapX * 1000) / 1000,
                        ['--pin-y' as string]:
                          Math.floor(location.mapY * 1000) / 1000,
                      }}
                      className={[
                        styles.pin,
                        index === step ? styles.active : '',
                        step > 0 && index !== step ? styles.hide : '',
                      ].join(' ')}
                    >
                      <MapPin />
                    </div>
                  </Themes>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurLocationsDesktop;
