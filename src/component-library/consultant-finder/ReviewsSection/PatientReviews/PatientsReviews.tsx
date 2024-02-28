/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { PatientsReviewsProps } from './PatientsReviews.types';
import styles from './PatietnsReviews.module.scss';
import axios from 'axios';
import Sorting from '../../../components/Sorting/Sorting';
import Reviews from '../../Reviews/Reviews';
import Text from '../../../foundation/Text/Text';
import TextButton from '../../../core-components/TextButton/TextButton';
import Icons from '../../../foundation/Icons/Icons';
import LoaderCF from '../../LoaderCF/LoaderCF';
import { formatDate } from '../../../utility-functions/index';

const PatientsReviews = (props: PatientsReviewsProps): JSX.Element => {
  const [reviews, setReviews] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [selectValue, setSelectValue] = useState<string>('asc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('use effect');
    axios
      .get(
        `https://api.doctify.com/api/hca/specialists/${props.slug}/reviews?limit=2&offset=${offset}&order=${selectValue}`
      )
      .then((resp) => {
        // console.log(resp);
        setIsLoading(false);
        console.log('reviews', resp.data);
        setReviews((reviews: any) => [...reviews, ...resp.data.rows]);
        setTotal(resp.data.total);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    // eslint-disable-next-line
        }, [offset, selectValue]);

  const loadMore = () => {
    setOffset((prev) => prev + 2);
  };

  return (
    <>
      {isLoading && <LoaderCF />}
      {!isLoading && total > 0 && (
        <div className={styles['patients-reviews']}>
          <div className={styles.header}>
            <div className={styles.title}>
              <Text tag="p" variation="body-bold-extra-large">
                Reviews from patients ({total})
              </Text>
            </div>
            <div className={styles.sort}>
              <Sorting
                options={[
                  {
                    id: 'option-a',
                    defaultChecked: true,
                    labelText: 'Newest',
                    value: 'asc',
                  },
                  {
                    id: 'option-b',
                    labelText: 'Oldest',
                    value: 'desc',
                  },
                ]}
                onChange={(event) => {
                  const target = event.target as HTMLInputElement;
                  console.log('value', target.value);
                  console.log(target.checked);
                  setReviews([]);
                  setSelectValue(target.value);
                  setOffset(0);
                }}
              />
            </div>
          </div>

          <div className={styles['review-wrapper']}>
            {reviews.length > 0 &&
              reviews.map((review: any) => (
                <div key={review.id} className={styles.review}>
                  <div className={styles.rating}>
                    <div>
                      <Text tag="p" variation="body-extra-large">
                        Overall experience
                      </Text>
                    </div>
                    <Reviews
                      reviewsTotal={5}
                      reviewsCount={review.overallExperience}
                      isConsultantProfileReviews={false}
                      hasDoctifyBranding={false}
                    />
                  </div>
                  <div>
                    <Text tag="p" variation="body-large">
                      {review.text}
                    </Text>
                  </div>
                  {review.reasonKeywords.length > 0 && (
                    <div className={styles['reason-wrapper']}>
                      <div className={styles['reason-text']}>
                        <Text tag="p" variation="body-medium">
                          Patient seen for:
                        </Text>
                      </div>
                      {review?.reasonKeywords.map((reason: any, index: any) => (
                        <div key={index} className={styles.reason}>
                          <Text tag="p" variation="body-medium">
                            {reason}
                          </Text>
                        </div>
                      ))}
                    </div>
                  )}
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
          There are no patient reviews for this consultant
        </Text>
      )}
    </>
  );
};

export default PatientsReviews;
