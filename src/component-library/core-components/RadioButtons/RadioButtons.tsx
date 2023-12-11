import React from 'react';
import { RadioButtonsProps } from './RadioButtons.types';
import styles from './RadioButtons.module.scss';

const RadioButtons = (props: RadioButtonsProps): JSX.Element => {
  const { children } = props;

  return <fieldset className={styles.wrapper}>{children}</fieldset>;
};

export default RadioButtons;
