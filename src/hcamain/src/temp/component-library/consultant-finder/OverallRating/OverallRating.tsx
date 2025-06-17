import React from 'react';
import { OverallRatingProps } from './OverallRating.types';
import styles from './OverallRating.module.scss';
import Text from '../../foundation/Text/Text';
import Reviews from '../Reviews/Reviews';
import Tooltips from '../../components/Tooltips/Tooltips';

const OverallRating = (props: OverallRatingProps): JSX.Element => {
  return (
    <div className={styles['overall-rating']}>
      <div className={styles.items}>
        <Text tag="h2" variation="heading-1">
          {props.title}
        </Text>
        {!props.ignoreReviewsConsultant && (
          <>
            <div className={styles.subtitle}>
              <div className={styles['subtitle-text']}>
                <Text tag="h3" variation="subheading-1">
                  {props.subtitle}
                </Text>
              </div>
              <Tooltips theme="light">Overall rating</Tooltips>
            </div>
            <div className={styles.reviews}>
              <div className={styles.col}>
                <div className={styles.title}>
                  <Text tag="h4" variation="body-medium-large">
                    {props.overallExperienceLabel}
                  </Text>
                </div>
                <Reviews
                  hasDoctifyBranding={false}
                  isConsultantProfileReviews={false}
                  reviewsCount={props.overallExperience}
                  reviewsTotal={5}
                />
              </div>
              <div className={styles.col}>
                <div className={styles.title}>
                  <Text tag="h4" variation="body-medium-large">
                    {props.personalCareLabel}
                  </Text>
                </div>
                <Reviews
                  hasDoctifyBranding={false}
                  isConsultantProfileReviews={false}
                  reviewsCount={props.overalCare}
                  reviewsTotal={5}
                />
              </div>
              <div className={styles.col}>
                <div className={styles.title}>
                  <Text tag="h4" variation="body-medium-large">
                    {props.explanationLabel}
                  </Text>
                </div>
                <Reviews
                  hasDoctifyBranding={false}
                  isConsultantProfileReviews={false}
                  reviewsCount={props.explanation}
                  reviewsTotal={5}
                />
              </div>
            </div>
          </>
        )}
        {props.ignoreReviewsConsultant && (
          <div className={styles['no-reviews']}>
            <Text tag="p" variation="body-extra-large">
              {props.noReviewsMsg}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverallRating;
