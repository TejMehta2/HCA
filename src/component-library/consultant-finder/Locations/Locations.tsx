/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { LocationsProps } from './Locations.types';
import styles from './Locations.module.scss';
import Practice from './Practice/Practice';
import Text from '../../foundation/Text/Text';
import VideoConsultation from './VideoConsultation/VideoConsultation';

const Locations = (props: LocationsProps): JSX.Element => {
  return (
    <div className={styles.locations}>
      <div className={styles.header}>
        <Text tag="h3" variation="heading-1">
          {props.title}
        </Text>
      </div>
      {props.locations.length > 0 &&
        props.locations.map(
          (practice: any) =>
            practice.slug !== 'video-consultation' && (
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
                facilityURL={practice?.facilityURL}
              ></Practice>
            )
        )}
      {props.locations.length > 0 &&
        props.locations.map(
          (practice: any) =>
            practice.slug === 'video-consultation' && (
              <VideoConsultation
                key={practice.id}
                title={'Video Consultation'}
                text={'Call to book a video consultation.'}
                phoneNumber={'+442045711724'}
              />
            )
        )}
      {props.locations.length === 0 && (
        <Text tag="p" variation="body-medium-large">
          {props.noLocationsText}
        </Text>
      )}
    </div>
  );
};

export default Locations;
