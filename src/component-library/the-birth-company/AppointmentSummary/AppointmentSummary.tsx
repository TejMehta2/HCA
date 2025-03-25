import React from 'react';
import { AppointmentSummaryProps } from './AppointmentSummary.types';
import styles from './AppointmentSummary.module.scss';
import Text from '../../foundation/Text/Text';

const AppointmentSummary = (props: AppointmentSummaryProps): JSX.Element => {
  const {
    title,
    locationTitle,
    location,
    appointmentTitle,
    appointment,
    dateTitle,
    date,
    priceTitle,
    price,
  } = props;
  return (
    <div className={styles.summary}>
      <div className={styles.title}>
        <Text tag="p" variation="body-bold-large">
          {title}
        </Text>
      </div>
      <div className={styles.item}>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-bold-small">
            {locationTitle}
          </Text>
        </div>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-small">
            {location}
          </Text>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-bold-small">
            {appointmentTitle}
          </Text>
        </div>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-small">
            {appointment}
          </Text>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-bold-small">
            {dateTitle}
          </Text>
        </div>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-small">
            {date}
          </Text>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-bold-small">
            {priceTitle}
          </Text>
        </div>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-small">
            {price}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
