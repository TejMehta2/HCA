import React, { type JSX } from 'react';
import { ReviewsProps } from './Reviews.types';
import styles from './Reviews.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Tooltips from '../../components/Tooltips/Tooltips';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import DoctifyLogo from '../../assets/images/doctify-dark.png';
import TextLink from '../../core-components/TextLink/TextLink';

const Reviews = (props: ReviewsProps): JSX.Element => {
  const stars = [];
  const fullStars = Math.min(5, Math.floor(props.reviewsCount));
  const decimal = props.reviewsCount - fullStars;

  // Push full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Icons iconName="iconCfstarfull100" />);
  }

  // Fill remaining stars with appropriate icons
  if (fullStars < 5) {
    if (decimal >= 0.875) {
      stars.push(<Icons iconName="iconCfstarfull100" />);
    } else if (decimal >= 0.625) {
      stars.push(<Icons iconName="iconCfstarfull75" />);
    } else if (decimal >= 0.375) {
      stars.push(<Icons iconName="iconCfstarfull50" />);
    } else if (decimal >= 0.125) {
      stars.push(<Icons iconName="iconCfstarfull25" />);
    } else {
      stars.push(<Icons iconName="iconCfstarfull0" />);
    }
  }

  // Fill the remaining stars with empty stars
  const remainingStars = Math.max(0, 5 - stars.length); // Calculate the number of remaining stars
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Icons iconName="iconCfstarfull0" />);
  }

  const goToReviews = () => {
    const ref = props.reviewsRef;

    // Scroll to the section if ref exists
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      console.log('Ref not found or not initialized'); // Debugging check
    }
  };

  return (
    <div className={styles.reviews} data-testid="reviews-component">
      {props.isConsultantProfileReviews && (
        <div
          className={`${styles['reviews-header']} ${props.reviewsTotal === 0 ? styles['reviews-header-no-reviews'] : ''
            }`}
        >
          <Text tag="h2" variation="subheading-2">
            {props.titleText}
          </Text>
          {props.reviewsTotal > 0 && (
            <Text tag="h3" variation="display-5">
              {props.reviewsCount}
            </Text>
          )}
        </div>
      )}

      <div
        className={`${styles['reviews-container']} ${!props.isConsultantProfileReviews &&
          styles['reviews-container-profile']
          }`}
      >
        <div
          className={`${styles['reviews-stars']} ${!props.isConsultantProfileReviews && styles['reviews-stars-profile']
            }`}
        >
          {stars.map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
        {!props.isConsultantProfileReviews && (
          <div className={styles['reviews-compact-text']}>
            <Text tag="p" variation="body-medium-large">
              {props.reviewsCount} / 5
            </Text>
          </div>
        )}
        {props.hasTooltip && (
          <Tooltips theme="light">{props.tooltipContent}</Tooltips>
        )}
      </div>

      {props.isConsultantProfileReviews && props.reviewsTotal > 0 && (
        <div className={styles['reviews-total']}>
          <TextLink>
            <button onClick={goToReviews}>
              <Icons iconName="iconComment" />
              <span>
                {props.reviewsTotal} {props.reviewsText}
              </span>
            </button>
          </TextLink>
        </div>
      )}

      {props.isConsultantProfileReviews && props.reviewsTotal === 0 && (
        <div className={styles['reviews-no-reviews-text']}>
          <Text tag="p" variation="body-medium-large">
            {props.noReviewsMsg}
          </Text>
        </div>
      )}

      {props.hasDoctifyBranding && !props.ignoreReviewsConsultant && (
        <div className={styles['reviews-doctify']}>
          <Text tag="p" variation="body-medium-large">
            {props.doctifyText}
          </Text>
          {props.doctifyLogo && (
            <div className={styles['reviews-doctify-image']}>
              {props.doctifyLogo}
            </div>
          )}
          {!props.doctifyLogo && (
            <div className={styles['reviews-doctify-image']}>
              <Image
                src={DoctifyLogo}
                alt="doctify logo"
                width="83"
                height="21"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;
