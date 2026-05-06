import React, { type JSX } from 'react';
import { StepLocationsWrapperProps } from './StepLocationsWrapper.types';
import styles from './StepLocationsWrapper.module.scss';

const StepLocationsWrapper = ({
  children
}: StepLocationsWrapperProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

export default StepLocationsWrapper;
