import React from 'react';
import { PaymentSummaryProps } from './PaymentSummary.types';
import styles from './PaymentSummary.module.scss';
import Themes from '../../foundation/Themes/Themes';

const PaymentSummary = (props: PaymentSummaryProps): JSX.Element => {
  const { heading, bodyText, summary, cta, isFlex = false } = props;
  return (
    <Themes theme="A-HCA-White">
      <div className={isFlex ? styles['flex-container'] : styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            {heading}
            {bodyText}
          </div>

          <div className={styles.summary}>{summary}</div>
          <div className={styles.cta}>{cta}</div>
        </div>
      </div>
    </Themes>
  );
};

export default PaymentSummary;
