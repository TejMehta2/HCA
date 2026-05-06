import React, { type JSX } from 'react';
import { LiveFormConfirmationProps } from './LiveFormConfirmation.types';
import styles from './LiveFormConfirmationMain.module.scss';
import Text from '../../foundation/Text/Text';

const LiveFormConfirmationMain = (
  props: LiveFormConfirmationProps
): JSX.Element => {
  const {
    children,
    headline,
    summary,
    nextStepsTitle,
    nextStepsContent,
    amendBookingTitle,
    amendBookingContent,
    isEnquireForm,
  } = props;
  return (
    <div className={styles['confirmation-page-main']}>
      <div className={styles.headline}>{headline}</div>
      {summary && <div className={styles.summary}>{summary}</div>}
      {!isEnquireForm && (
        <div className={styles.main}>
          <div className={styles.info}>
            <div className={styles['info-title']}>
              <Text tag="h2" variation="body-medium-extra-large">
                {nextStepsTitle}
              </Text>
            </div>
            <div className={styles['info-text']}>
              <Text tag="p" variation="body-extra-large">
                {nextStepsContent}
              </Text>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles['info-title']}>
              <Text tag="h2" variation="body-medium-extra-large">
                {amendBookingTitle}
              </Text>
            </div>
            <div className={styles['info-text']}>
              <Text tag="p" variation="body-extra-large">
                {amendBookingContent}
              </Text>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default LiveFormConfirmationMain;
