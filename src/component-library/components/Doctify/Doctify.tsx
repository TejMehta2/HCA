import React from 'react';
import { DoctifyProps } from './Doctify.types';
import Icons from '../../foundation/Icons/Icons';
import styles from './Doctify.module.scss';

const Doctify = (props: DoctifyProps): JSX.Element => {
  const { rating, reviews, logo, link, alignment } = props;

  const stars = [];
  const inactiveStars = [];
  const maxRating = 5;
  const ratingNumber = Math.round(Number(rating));
  const inactiveStarCount = maxRating - ratingNumber;

  for (let i = 0; i < ratingNumber; i++) {
    stars.push(<Icons iconName="iconStar" />);
  }

  if (inactiveStarCount > 0) {
    for (let i = 0; i < inactiveStarCount; i++) {
      inactiveStars.push(<Icons iconName="iconStar" />);
    }
  }

  return (
    <div className={[styles.wrapper, styles[ratingNumber]].join(' ')}>
      <div className={styles.link}>{link}</div>
      <div className={styles['review-container']}>
        <span className={styles.rating}>
          <ul>
            {stars.map((star, index) => (
              <li key={index}>{star}</li>
            ))}
          </ul>
          <ul className={styles.inactive}>
            {inactiveStars.map((star, index) => (
              <li key={index}>{star}</li>
            ))}
          </ul>
        </span>
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
