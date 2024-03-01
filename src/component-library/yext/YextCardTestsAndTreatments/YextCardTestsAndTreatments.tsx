import React from 'react';
import { YextCardTestsAndTreatmentsProps } from './YextCardTestsAndTreatments.types';
import styles from './YextCardTestsAndTreatments.module.scss';

const YextCardTestsAndTreatments = (
  props: YextCardTestsAndTreatmentsProps
): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default YextCardTestsAndTreatments;
