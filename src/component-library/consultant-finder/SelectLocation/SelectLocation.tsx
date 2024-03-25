/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SelectLocationProps } from './SelectLocation.types';
import LocationCard from '../LocationCard/LocationCard';
import styles from './SelectLocation.module.scss';

const SelectLocation = (props: SelectLocationProps): JSX.Element => {
  return (
    <div className={styles['select-location']}>
      {props.locations.length &&
        props.locations.length > 0 &&
        props.locations.map((item: any) => (
          <LocationCard
            key={item?.facilityCRMID}
            icon={null}
            title={item?.facilityFullName}
            text={item?.facilityAddress}
            handleClick={() => console.log('hello')}
          />
        ))}
      {!props.locations.length && props.locations.length === 0 && (
        <div>No results</div>
      )}
    </div>
  );
};

export default SelectLocation;
