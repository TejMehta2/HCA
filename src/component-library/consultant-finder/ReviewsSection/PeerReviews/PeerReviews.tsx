/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { PeerReviewsProps } from './PeerReviews.types';
import styles from './PeerReviews.module.scss';
import axios from 'axios';
import Text from '../../../foundation/Text/Text';
import TextButton from '../../../core-components/TextButton/TextButton';
import Icons from '../../../foundation/Icons/Icons';
import LoaderCF from '../../LoaderCF/LoaderCF';
import { formatDate } from '../../../utility-functions/index';

const PeerReviews = (props: PeerReviewsProps): JSX.Element => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.doctify.com/api/hca/specialists/${props.slug}/peerRecommendations`
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
      {isLoading && <LoaderCF />}
      {!isLoading && total > 0 && (
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
                    <div className={styles.text}>
                      <Text tag="p" variation="body-bold-extra-large">
                        {review.recommender.title}{' '}
                        {review.recommender.firstName}{' '}
                        {review.recommender.lastName}
                      </Text>
                      {review.keywords.length > 0 && (
                        <Text tag="p" variation="body-small">
                          {
                            // Filter specialties and get their names
                            review.keywords
                              .filter(
                                (keyword: any) => keyword.type === 'specialty'
                              )
                              .map((keyword: any) => keyword.name)
                              .join(', ')
                          }
                        </Text>
                      )}
                    </div>
                  </div>
                  {review.connection !== null &&
                    review.connection.length > 0 && (
                      <div className={styles.connection}>
                        <Text tag="p" variation="body-medium">
                          {review.connection}
                        </Text>
                      </div>
                    )}
                  <div>
                    <Text tag="p" variation="body-large">
                      {review.recommendation}
                    </Text>
                  </div>
                  <div className={styles['date-branding-wrapper']}>
                    {review?.createdAt !== null && review?.createdAt !== '' && (
                      <div className={styles.date}>
                        <Text tag="p" variation="body-medium">
                          {formatDate(review?.createdAt)}
                        </Text>
                      </div>
                    )}
                    <div className={styles.branding}>
                      <Text tag="p" variation="body-medium">
                        Verified by:
                      </Text>
                      {props.docitfyLogo && (
                        <img
                          src={props.docitfyLogo}
                          alt="doctify logo"
                          width="83"
                          height="21"
                        />
                      )}
                    </div>
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
      {!isLoading && total === 0 && (
        <Text tag="p" variation="body-large">
          There are no peer reviews for this consultant
        </Text>
      )}
    </>
  );
};

export default PeerReviews;
