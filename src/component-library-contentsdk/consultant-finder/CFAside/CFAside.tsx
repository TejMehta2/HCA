import React, { type JSX } from 'react';
import { CFAsideProps } from './CFAside.types';
import styles from './CFAside.module.scss';

const CFAside = (props: CFAsideProps): JSX.Element => {
  const { children } = props;
  return <div className={styles['cf-aside']}>{children}</div>;
};

export default CFAside;
