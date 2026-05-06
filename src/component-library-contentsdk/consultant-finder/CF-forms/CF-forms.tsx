import React, { type JSX } from 'react';
import { CFformsProps } from './CF-forms.types';
import styles from './CF-forms.module.scss';

const CFforms = (props: CFformsProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default CFforms;
