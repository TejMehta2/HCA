/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { PeerReviewsProps } from './PeerReviews.types';
import styles from './PeerReviews.module.scss';
import axios from 'axios';
import Text from '../../../foundation/Text/Text';
import TextButton from '../../../core-components/TextButton/TextButton';
import Icons from '../../../foundation/Icons/Icons';
import Loader from '../../../foundation/Loader/Loader';

const PeerReviews = (props: PeerReviewsProps): JSX.Element => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('use effect peers');
    axios
      .get(
        `https://api.doctify.com/api/hca/specialists/${'mr-andrew-goldberg'}/peerRecommendations`
      )
      .then((resp) => {
        // console.log(resp);
        setIsLoading(false);
        console.log('reviews', resp.data);
        setReviews(resp.data.rows);
        setTotal(resp.data.total);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    // eslint-disable-next-line
        }, []);

  const loadMore = () => {
    console.log('load more');
  };

  return (
    <>
      {isLoading && <Loader theme={'dark'} />}
      {!isLoading && (
        <div className={styles['patients-reviews']}>
          <div className={styles.header}>
            <div className={styles.title}>
              <Text tag="p" variation="body-bold-extra-large">
                Reviews from peers ({total})
              </Text>
            </div>
          </div>

          <div className={styles['review-wrapper']}>
            {reviews.length > 0 &&
              reviews.map((review) => (
                <div key={review.id} className={styles.review}>
                  <div className={styles.rating}>
                    <div className={styles.image}>
                      <img
                        src={review.recommender.image}
                        alt="peer image"
                        width="76"
                        height="76"
                      />
                    </div>
                    <Text tag="p" variation="body-bold-extra-large">
                      {review.recommender.title} {review.recommender.firstName}{' '}
                      {review.recommender.lastName}
                    </Text>
                  </div>
                  <div>
                    <Text tag="p" variation="body-large">
                      {review.recommendation}
                    </Text>
                  </div>
                </div>
              ))}
            {reviews.length < total && (
              <div>
                <TextButton theme="dark">
                  <button onClick={loadMore}>
                    Load more
                    <Icons iconName="iconPlus" />
                  </button>
                </TextButton>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PeerReviews;
