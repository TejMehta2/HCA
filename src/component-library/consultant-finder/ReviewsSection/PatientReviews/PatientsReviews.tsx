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
  const [selectValue, setSelectValue] = useState<string>('desc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //console.log('patient reviews', props);
    const patientURL =
      props.doctifyReviewsURL
        ?.replace('{slug}', props.slug)
        .replace('{limit}', props.doctifyReviewsLimit?.toString())
        .replace('{offset}', offset.toString())
        .replace('{order}', selectValue) ||
      `https://api.doctify.com/api/hca/specialists/${props.slug}/reviews?limit=2&offset=${offset}&order=${selectValue}`;
    //console.log('patient patientURL', patientURL);
    axios
      .get(patientURL)
      .then((resp) => {
        // console.log(resp);
        setIsLoading(false);
        //console.log('reviews', resp.data);
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
                {props.reviewsFromPatientsTitleText} ({total})
              </Text>
            </div>
            <div className={styles.sort}>
              <Sorting
                options={[
                  {
                    id: 'option-a',
                    defaultChecked: true,
                    labelText: 'Newest',
                    value: 'desc',
                  },
                  {
                    id: 'option-b',
                    labelText: 'Oldest',
                    value: 'asc',
                  },
                ]}
                onChange={(event) => {
                  const target = event.target as HTMLInputElement;
                  // console.log('value', target.value);
                  //console.log(target.checked);
                  setIsLoading(true);
                  setReviews([]);
                  setSelectValue(target.value);
                  setOffset(0);
                }}
              />
            </div>
          </div>

          <div className={styles['review-wrapper']}>
            {reviews.length > 0 &&
              reviews.map((review: any, key: React.Key | null | undefined) => (
                <div key={key} className={styles.review}>
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
            {!isLoading && reviews.length < total && (
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

export default PatientsReviews;
