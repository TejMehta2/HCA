import React from 'react';
import { CheckboxesProps } from './Checkboxes.types';
import styles from './Checkboxes.module.scss';

const Checkboxes = (props: CheckboxesProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default Checkboxes;
