import React, { type JSX } from 'react';
import { PaymentFormHeaderProps } from './PaymentFormHeader.types';
import styles from './PaymentFormHeader.module.scss';
import LogoBlue from '../../foundation/BrandAssets/Logo blue.svg?react';

const PaymentFormHeader = (props: PaymentFormHeaderProps): JSX.Element => {
  const {
    paymentsText,
    contactText,
    phoneNumber,
    openingHours,
    logo = <LogoBlue />,
  } = props;
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles['logo-section']}>
          <a className={styles.logo} href="/">
            <span className="sr-only">Home</span>
            {logo}
          </a>
          <div className={styles['payments-text']}>{paymentsText}</div>
        </div>

        {phoneNumber && (
          <div className={styles.contact}>
            <div className={styles['contact-text']}>{contactText}</div>
            <div className={styles.phone}>
              <a href={`tel:${phoneNumber.number}`}>
                {phoneNumber.icon}
                {phoneNumber.text}
              </a>
            </div>
            {openingHours && (
              <div className={styles['opening-hours']}>
                {openingHours.icon} {openingHours.text}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default PaymentFormHeader;
