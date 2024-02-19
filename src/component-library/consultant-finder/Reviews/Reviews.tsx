import React from 'react';
import { ReviewsProps } from './Reviews.types';
import styles from './Reviews.module.scss';

const Reviews = (props: ReviewsProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default Reviews;
