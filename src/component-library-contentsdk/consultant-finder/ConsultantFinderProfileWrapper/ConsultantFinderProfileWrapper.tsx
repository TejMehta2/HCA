import React, { type JSX } from 'react';
import { ConsultantFinderProfileWrapperProps } from './ConsultantFinderProfileWrapper.types';
import styles from './ConsultantFinderProfileWrapper.module.scss';

const ConsultantFinderProfileWrapper = (
  props: ConsultantFinderProfileWrapperProps
): JSX.Element => {
  const { children } = props;
  return (
    <div className={`${styles['consultant-finder-profile-wrapper']}`}>
      {children}
    </div>
  );
};

export default ConsultantFinderProfileWrapper;
