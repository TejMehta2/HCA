import React from 'react';
import { SelectFieldProps } from './SelectField.types';
import styles from './SelectField.module.scss';

const SelectField = (props: SelectFieldProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default SelectField;
