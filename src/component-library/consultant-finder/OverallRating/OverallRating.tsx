import React from 'react';
import { OverallRatingProps } from './OverallRating.types';
import styles from './OverallRating.module.scss';

const OverallRating = (props: OverallRatingProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default OverallRating;
