import React from 'react';
import { DoctifyProps } from './Doctify.types';
import Icons from '../../foundation/Icons/Icons';
import styles from './Doctify.module.scss';

const Doctify = (props: DoctifyProps): JSX.Element => {
  const { rating, reviews, logo, link, theme, alignment } = props;

  const themeOveride = theme
    ? theme !== 'dark'
      ? styles.light
      : styles.dark
    : '';

  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Icons iconName="iconStar" />);
  }

  return (
    <div className={[styles.wrapper, styles[rating], themeOveride].join(' ')}>
      <div className={styles.link}>{link}</div>
      <div className={styles['review-container']}>
        <span className={styles.rating}>{stars.map((star) => star)}</span>
        <span className={styles.reviews}>{reviews} reviews</span>
      </div>
      <div className={[styles.logo, alignment && styles[alignment]].join(' ')}>
        <span>Verified by:</span>
        <span className={styles['light-logo']}>{logo.light}</span>
        <span className={styles['dark-logo']}>{logo.dark}</span>
      </div>
    </div>
  );
};

export default Doctify;
