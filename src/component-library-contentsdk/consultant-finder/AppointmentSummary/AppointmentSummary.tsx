'use client';

import React, { type JSX } from 'react';
import { useRouter } from 'next/router';
import { AppointmentSummaryProps } from './AppointmentSummary.types';
import styles from './AppointmentSummary.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const AppointmentSummary = (props: AppointmentSummaryProps): JSX.Element => {
  const router = useRouter();

  return (
    <div
      className={
        props.isMobile ? `${styles.summary} ${styles.mobile}` : styles.summary
      }
    >
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
          <button
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              router.push(
                `${props.liveBookingFormStepLocationSelect}?slug=${props.slug}&name=${encodeURIComponent(props.name || '')}&gmcNumber=${props.gmcNumber}&isFollowOnAppointment=${props.isFollowUpAppointment}&reviewsTotal=${props.reviewsTotal}&search=${props.search}&keywordId=${props.keywordId}`
              );
            }}
          >
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
          <button
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              router.push(
                `${props.liveBookingFormStepSlotSelect}?slug=${props.slug}&name=${encodeURIComponent(props.name || '')}&gmcNumber=${props.gmcNumber}&isFollowOnAppointment=${props.isFollowUpAppointment}&reviewsTotal=${props.reviewsTotal}&search=${props.search}&keywordId=${props.keywordId}`
              );
            }}
          >
            <Icons iconName="iconEdit" />
          </button>
        </div>
        <div className={styles['item-title']}>
          <Text tag="p" variation="body-small">
            {props.dateText}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
