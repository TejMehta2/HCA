import React from 'react';
import { ConfirmationSummaryProps } from './ConfirmationSummary.types';
import styles from './ConfirmationSummary.module.scss';
import Text from '../../foundation/Text/Text';

const ConfirmationSummary = (props: ConfirmationSummaryProps): JSX.Element => {
  const {
    title,
    patientTitle,
    patientName,
    dateTitle,
    date,
    timeTitle,
    time,
    consultantTitle,
    consultantName,
    facilityTitle,
    facilityName,
    optionalItems,
    noSpacing = false,
  } = props;
  return (
    <div
      className={
        noSpacing
          ? [styles['confirmation-summary'], styles['no-spacing']].join(' ')
          : styles['confirmation-summary']
      }
    >
      {title && (
        <div className={styles.title}>
          <Text tag="h2" variation="body-medium-extra-large">
            {title}
          </Text>
        </div>
      )}

      <div className={styles.summary}>
        {patientTitle && patientName && (
          <div className={styles.item}>
            <Text tag="h4" variation="body-medium-large">
              {patientTitle}
            </Text>
            <Text tag="p" variation="body-large">
              {patientName}
            </Text>
          </div>
        )}
        {dateTitle && date && (
          <div className={styles.item}>
            <Text tag="h4" variation="body-medium-large">
              {dateTitle}
            </Text>
            <Text tag="p" variation="body-large">
              {date}
            </Text>
          </div>
        )}
        {timeTitle && time && (
          <div className={styles.item}>
            <Text tag="h4" variation="body-medium-large">
              {timeTitle}
            </Text>
            <Text tag="p" variation="body-large">
              {time}
            </Text>
          </div>
        )}
        {consultantTitle && consultantName && (
          <div className={styles.item}>
            <Text tag="h4" variation="body-medium-large">
              {consultantTitle}
            </Text>
            <Text tag="p" variation="body-large">
              {consultantName}
            </Text>
          </div>
        )}
        {facilityTitle && facilityName && (
          <div className={styles.item}>
            <Text tag="h4" variation="body-medium-large">
              {facilityTitle}
            </Text>
            <Text tag="p" variation="body-large">
              {facilityName}
            </Text>
          </div>
        )}
        {optionalItems &&
          optionalItems.map((item, index) => {
            return (
              <div className={styles.item} key={index}>
                <Text tag="h4" variation="body-medium-large">
                  {item.title}
                </Text>
                <Text tag="p" variation="body-large">
                  {item.text}
                </Text>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ConfirmationSummary;
