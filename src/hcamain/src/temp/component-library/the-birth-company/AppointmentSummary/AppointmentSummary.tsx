import React from 'react';
import { AppointmentSummaryProps } from './AppointmentSummary.types';
import styles from './AppointmentSummary.module.scss';
import Text from '../../foundation/Text/Text';

const AppointmentSummary = (props: AppointmentSummaryProps): JSX.Element => {
  const {
    title,
    locationTitle,
    location,
    scanTitle,
    scan,
    appointmentTitle,
    appointment,
    dateTitle,
    date,
    priceTitle,
    price,
    isMobile = false,
  } = props;
  return (
    <div
      className={
        isMobile ? [styles.summary, styles.mobile].join(' ') : styles.summary
      }
    >
      <div className={styles.title}>
        <Text tag="p" variation="body-bold-large">
          {title}
        </Text>
      </div>
      {location && (
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
      )}
      {scan && (
        <div className={styles.item}>
          <div className={styles['item-title']}>
            <Text tag="p" variation="body-bold-small">
              {scanTitle}
            </Text>
          </div>
          <div className={styles['item-title']}>
            <Text tag="p" variation="body-small">
              {scan}
            </Text>
          </div>
        </div>
      )}
      {appointment && (
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
      )}
      {date && (
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
      )}
      {price && (
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
      )}
    </div>
  );
};

export default AppointmentSummary;
