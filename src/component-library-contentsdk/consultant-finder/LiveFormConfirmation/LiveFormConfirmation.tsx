import React, { type JSX } from 'react';
import { LiveFormConfirmationProps } from './LiveFormConfirmation.types';
import styles from './LiveFormConfirmation.module.scss';

const LiveFormConfirmation = (
  props: LiveFormConfirmationProps
): JSX.Element => {
  const { children } = props;
  return <div className={styles['confirmation-page']}>{children}</div>;
};

export default LiveFormConfirmation;
