import React from 'react';
import { TickListProps } from './TickList.types';
import styles from './TickList.module.scss';

const TickList = (props: TickListProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.wrapper}>{children}</div>;
};

export default TickList;
