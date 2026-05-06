/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, type JSX } from 'react';
import { PeerReviewsProps } from './PeerReviews.types';
import styles from './PeerReviews.module.scss';
import axios from 'axios';
import Text from '../../../foundation/Text/Text';
import TextButton from '../../../core-components/TextButton/TextButton';
import Icons from '../../../foundation/Icons/Icons';
import LoaderCF from '../../LoaderCF/LoaderCF';
import { formatDate } from '../../../utility-functions/index';
const reviewPerRow = 2;

const PeerReviews = (props: PeerReviewsProps): JSX.Element => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setNext] = useState(reviewPerRow);

  useEffect(() => {
    //console.log('peer review', props);
    const peerURL =
      props.doctifyReviewsURL?.replace('{slug}', props.slug) ||
      `https://api.doctify.com/api/hca/specialists/${props.slug}/peerRecommendations`;

    axios
      .get(peerURL)
      .then((resp) => {
        // console.log(resp);
        setIsLoading(false);
        //console.log('reviews', resp.data);
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
    setNext(next + reviewPerRow);
  };

  return (
    <>
      {isLoading && <LoaderCF />}
      {!isLoading && total > 0 && (
        <div className={styles['patients-reviews']}>
          <div className={styles.header}>
            <div className={styles.title}>
              <Text tag="p" variation="body-bold-extra-large">
                {props.reviewsFromPeersTitleText} ({total})
              </Text>
            </div>
          </div>

          <div className={styles['review-wrapper']}>
            {reviews.length > 0 &&
              reviews
                ?.slice(0, next)
                ?.map((review, key: React.Key | null | undefined) => (
                  <div key={key} className={styles.review}>
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
                            {review.keywords
                              .filter(
                                (keyword: any) => keyword.type === 'specialty'
                              )
                              .map((keyword: any) => keyword.name)
                              .join(', ')}
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
                      {review?.createdAt !== null &&
                        review?.createdAt !== '' && (
                          <div className={styles.date}>
                            <Text tag="p" variation="body-medium">
                              {formatDate(review?.createdAt)}
                            </Text>
                          </div>
                        )}
                      <div className={styles.branding}>
                        <Text tag="p" variation="body-medium">
                          {props.verifyByDoctifyText}
                        </Text>
                        {props.doctifyLogo && (
                          <img
                            src={props.doctifyLogo}
                            alt="doctify logo"
                            width="83"
                            height="21"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            {!isLoading && next < reviews?.length && (
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
          {props.noReviewsText}
        </Text>
      )}
    </>
  );
};

export default PeerReviews;
