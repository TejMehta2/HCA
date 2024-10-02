import React, { useContext } from 'react';
import { LocationCardProps } from './LocationCard.types';
import Text from '../../foundation/Text/Text';
import { ConsultantFinderContext } from '../../../hcamain/src/context/consultantFinderContext';
import styles from './LocationCard.module.scss';
import { formatDateLong } from '../../utility-functions/index';

const LocationCard = (props: LocationCardProps): JSX.Element => {
  const { selectedLocation } = useContext(ConsultantFinderContext);
  return (
    <div
      className={`${styles['location-card']} ${
        selectedLocation === props.facilityCRMID ? styles['selected'] : ''
      }`}
      onClick={(e) => props.handleClick(e)}
      data-parent="parent"
    >
      <div className={styles.main}>
        <div className={styles.title}>
          <Text tag="h3" variation="body-medium-large">
            {props.title}
          </Text>
        </div>
        <div className={styles.description}>
          <Text tag="p" variation="body-medium-small">
            {props.text}
          </Text>
        </div>
      </div>
      {/* to add logic, this is slot time, it can be the phone one */}
      {props.time && (
        <div className={styles.time}>
          <div className={styles.icon}>{props.icon}</div>
          <Text tag="p" variation="body-medium-small">
            {formatDateLong(props.time)}
          </Text>
        </div>
      )}
      {/* to add logic, this is online booking time */}
      {/* {props.filteredTime && ( */}
      <div className={styles.time}>
        <div className={styles.icon}>{props.iconFilteredTime}</div>
        <Text tag="p" variation="body-medium-small">
          {formatDateLong(props.time)}
        </Text>
      </div>
      {/* )} */}
    </div>
  );
};

export default LocationCard;
