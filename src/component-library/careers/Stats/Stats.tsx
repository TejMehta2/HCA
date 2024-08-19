import React from 'react';
import { StatsProps } from './Stats.types';
import styles from './Stats.module.scss';

const Stats = (props: StatsProps): JSX.Element => {
  const { heading, children } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>{heading}</div>
        <div className={styles.grid}>{children}</div>
      </div>
    </div>
  );
};

export default Stats;
