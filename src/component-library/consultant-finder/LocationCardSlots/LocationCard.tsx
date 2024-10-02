import React, { useContext } from 'react';
import { LocationCardProps } from './LocationCard.types';
import Text from '../../foundation/Text/Text';
import { ConsultantFinderContext } from '../../../hcamain/src/context/consultantFinderContext';
import styles from './LocationCard.module.scss';
import { formatDateLong } from '../../utility-functions/index';

const LocationCard = (props: LocationCardProps): JSX.Element => {
  const { selectedLocation } = useContext(ConsultantFinderContext);

  const slotDateTime: string | null = props.time || '';
  const filteredSlotDateTime: string | null = props.filteredTime || '';

  const date1 = new Date(slotDateTime);
  const date2 = new Date(filteredSlotDateTime);

  // Compare the date portion only (year, month, day)
  const isSameDate =
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  if (isSameDate) {
    console.log('The dates are the same');
  } else {
    console.log('The dates are different');
  }

  // Compare the full datetime (date and time)
  if (date1.getTime() === date2.getTime()) {
    console.log('The date and time are the same');
  } else {
    console.log('The date and time are different');
  }

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
      {/* book online time */}
      {filteredSlotDateTime !== '' && (
        <div className={styles.time}>
          <div className={styles.icon}>{props.icon}</div>
          <Text tag="p" variation="body-medium-small">
            {formatDateLong(props.filteredTime)}
          </Text>
        </div>
      )}
      {/* slot time, which can be phone call bookings if not the same as filtered time 
      then show it, we assume it is phone bookings */}
      {slotDateTime !== '' && !isSameDate && (
        <div className={styles.time}>
          <div className={styles.icon}>{props.iconPhone}</div>
          <Text tag="p" variation="body-medium-small">
            {formatDateLong(props.time)}
          </Text>
        </div>
      )}
    </div>
  );
};

export default LocationCard;
