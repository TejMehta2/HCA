import React from 'react';
import { StatsProps } from './Stats.types';
import styles from './Stats.module.scss';

const Stats = (props: StatsProps): JSX.Element => {
  const { heading, variant, children } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>{heading}</div>
        <div
          className={
            variant === 'threeCol' ? styles['grid-3-col'] : styles.grid
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Stats;
