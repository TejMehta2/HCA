import React, { type JSX } from 'react';
import { ConsultantFinderResultsProps } from './ConsultantFinderResults.types';
import styles from './ConsultantFinderResults.module.scss';

const ConsultantFinderResults = (
  props: ConsultantFinderResultsProps
): JSX.Element => {
  const { children } = props;
  return <div className={styles.results}>{children}</div>;
};

export default ConsultantFinderResults;
