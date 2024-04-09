import React from 'react';
import { AppointmentSummaryProps } from './AppointmentSummary.types';
import styles from './AppointmentSummary.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const AppointmentSummary = (props: AppointmentSummaryProps): JSX.Element => {
  return (
    <div className={styles.summary}>
      <div className={styles.title}>
        <Text tag="p" variation="body-medium-large">
          {props.title}
        </Text>
      </div>
      <div className={styles.item}>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-medium-small">
            {props.consultantTitle}
          </Text>
        </div>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-small">
            {props.consultantText}
          </Text>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-medium-small">
            {props.locationTitle}
          </Text>
          <button className={styles.button}>
            <Icons iconName="iconEdit" />
          </button>
        </div>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-small">
            {props.locationText}
          </Text>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-medium-small">
            {props.dateTitle}
          </Text>
          <button className={styles.button}>
            <Icons iconName="iconEdit" />
          </button>
        </div>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-small">
            {props.consultantText}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
