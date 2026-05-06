import React from 'react';
import { LiveBookingFormProps } from './LiveBookingForm.types';
import styles from './LiveBookingForm.module.scss';

const LiveBookingForm = (props: LiveBookingFormProps): JSX.Element => {
  const { children } = props;
  return <div className={styles['cf-form']}>{children}</div>;
};

export default LiveBookingForm;
