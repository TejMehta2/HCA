import React, { type JSX } from 'react';
import { StatsProps } from './Stats.types';
import styles from './Stats.module.scss';

const Stats = (props: StatsProps): JSX.Element => {
  const { heading, variant, children } = props;
  return (
    <div
      className={[
        styles.wrapper,
        variant === 'threeCol' ? styles['grid-3-col'] : styles['default'],
      ].join(' ')}
    >
      <div className={styles.container}>
        {heading && <div className={styles.heading}>{heading}</div>}
        <div className={styles.grid}>{children}</div>
      </div>
    </div>
  );
};

export default Stats;
