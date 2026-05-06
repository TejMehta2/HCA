import React from 'react';
import { NumbersProps } from './Numbers.types';
import styles from './Numbers.module.scss';

const Numbers = (props: NumbersProps): JSX.Element => {
  const { number, size = 'large' } = props;
  return <span className={`${styles.wrapper} ${styles[size]}`}>{number}</span>;
};

export default Numbers;
