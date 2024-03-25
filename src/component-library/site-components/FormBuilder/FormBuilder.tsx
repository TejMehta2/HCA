import React from 'react';
import { FormBuilderProps } from './FormBuilder.types';
import styles from './FormBuilder.module.scss';

const FormBuilder = (props: FormBuilderProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.wrapper}>{children}</div>;
};

export default FormBuilder;
