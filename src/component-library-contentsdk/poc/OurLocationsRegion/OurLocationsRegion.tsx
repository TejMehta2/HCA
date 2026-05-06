import React, { type JSX } from 'react';
import {
  OurLocationsRegionProps,
  RegionImageProps,
} from './OurLocationsRegion.types';
import styles from './OurLocationsRegion.module.scss';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import CardLocation from '../../components/CardLocation/CardLocation';

/* Create image */
export const RegionImage = (props: RegionImageProps): JSX.Element => {
  const { src, alt, classNames, imgStyle } = props;
  return (
    <div className={`${styles.image} ${classNames}`} data-animate="l">
      <Image src={src} alt={alt} width={913} height={1069} style={imgStyle} />
    </div>
  );
};

const OurLocationsRegion = (props: OurLocationsRegionProps): JSX.Element => {
  const {
    id,
    theme,
    name,
    amount,
    area,
    mapStyles,
    cardStyles,
    activeRegion = 0,
    onFocus,
  } = props;

  const width = window.innerWidth;
  // large screen breakpoint
  const isL = width > 1135;

  return (
    <React.Fragment key={id}>
      {/* On desktop. Generate region image */}
      {area.desktop && (
        <RegionImage
          src={area.desktop}
          alt="a map of England with the current region highlighted"
          classNames={`${styles.region} ${activeRegion ? styles.active : ''}`}
          imgStyle={isL ? mapStyles : {}}
        />
      )}

      {/* Generate location card and mobile version of region map */}
      <div
        className={`${styles['card-container']} ${
          activeRegion ? styles.active : ''
        }`}
        style={isL ? cardStyles : {}}
      >
        {area && (
          <RegionImage
            src={area.mobile}
            alt="a map of England with the current region highlighted"
            classNames={styles.mobile}
            imgStyle={isL ? mapStyles : {}}
          />
        )}
        <div className={`${styles.card}`} data-animate="m">
          <CardLocation
            theme={theme}
            amount={
              <Text tag="p" variation="display-1">
                {amount}
              </Text>
            }
            title={
              <Text tag="p" variation="heading-2">
                {name}
              </Text>
            }
            cta={
              <a href="#" onFocus={() => onFocus?.(id)}>
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
};

export default OurLocationsRegion;
