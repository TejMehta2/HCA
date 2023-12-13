import React from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default Checkbox;
