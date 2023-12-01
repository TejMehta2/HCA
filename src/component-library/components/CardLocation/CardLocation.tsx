import React from 'react';
import { CardLocationProps } from './CardLocation.types';
import styles from './CardLocation.module.scss';

const CardLocation = (props: CardLocationProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default CardLocation;
