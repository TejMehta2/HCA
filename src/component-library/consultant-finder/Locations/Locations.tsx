/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { LocationsProps } from './Locations.types';
import styles from './Locations.module.scss';
import Practice from './Practice/Practice';
import Text from '../../foundation/Text/Text';

const Locations = (props: LocationsProps): JSX.Element => {
  return (
    <div className={styles.locations}>
      <div className={styles.header}>
        <Text tag="h3" variation="heading-1">
          {props.title}
        </Text>
      </div>
      {props.locations.length > 0 &&
        props.locations.map((practice: any) => (
          <Practice
            key={practice.id}
            name={practice?.name}
            street1={practice?.address?.street1}
            street2={practice?.address?.street2}
            city={practice?.address?.city}
            postcode={practice?.address?.postcode}
            lat={practice?.address?.geolocation?.lat}
            long={practice?.address?.geolocation?.lon}
            slug={practice?.slug}
            workingOpeningHours={practice?.workingOpeningHours}
          ></Practice>
        ))}
    </div>
  );
};

export default Locations;
