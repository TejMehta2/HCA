import React from 'react';
import { PaymentSummaryProps } from './PaymentSummary.types';
import styles from './PaymentSummary.module.scss';
import Themes from '../../foundation/Themes/Themes';

const PaymentSummary = (props: PaymentSummaryProps): JSX.Element => {
  const { heading, bodyText, summary, cta } = props;
  return (
    <Themes theme="A-HCA-White">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {heading}
          {bodyText}
        </div>

        <div className={styles.summary}>{summary}</div>
        <div className={styles.cta}>{cta}</div>
      </div>
    </Themes>
  );
};

export default PaymentSummary;
