import React, { type JSX } from 'react';
import { RadiusProps } from './Radius.demo.types';
import styles from './Radius.demo.module.scss';

const Radius = (props: RadiusProps): JSX.Element => {
  const {} = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.large} data-testid="large">
        <span>Large Radius</span>
      </div>
      <div className={styles.medium} data-testid="medium">
        <span>Medium Radius</span>
      </div>
      <div className={styles.small} data-testid="small">
        <span>Small Radius</span>
      </div>
    </div>
  );
};

export default Radius;
