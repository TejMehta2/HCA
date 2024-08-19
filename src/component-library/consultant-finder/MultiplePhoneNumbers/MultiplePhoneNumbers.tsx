/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MultiplePhoneNumbersProps } from './MultiplePhoneNumbers.types';
import Address from '../Address/Address';
import Text from '../../foundation/Text/Text';
import styles from './MultiplePhoneNumbers.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Button from '../../core-components/Button/Button';
import TextLink from '../../core-components/TextLink/TextLink';

const MultiplePhoneNumbers = (
  props: MultiplePhoneNumbersProps
): JSX.Element => {
  const filteredPractices = props.practices.filter(
    (practice: { slug: string }) => practice.slug !== 'video-consultation'
  );

  let shouldRenderPracticePhones = false;

  if (props?.doctifyPhoneSlugs) {
    shouldRenderPracticePhones = props.doctifyPhoneSlugs.includes(props.slug);
  } else if (props?.isDoctifyPhoneNumberConsultant) {
    shouldRenderPracticePhones = props.isDoctifyPhoneNumberConsultant;
  }

  console.log('slug', props.slug);
  console.log('shouldRenderPracticePhones', shouldRenderPracticePhones);
  console.log('default number', props.defaultNumber);

  return (
    <div
      className={`${styles.phones} ${
        filteredPractices.length > 2 ? styles['phones-multiple'] : ''
      }  ${filteredPractices.length === 1 ? styles['phones-one-col'] : ''}`}
    >
      {filteredPractices.length > 0 &&
        filteredPractices.map((practice: any, index: any) => (
          <div
            className={`${styles.item} ${
              filteredPractices.length === 2 ? styles['item-two'] : ''
            }
            ${filteredPractices.length === 1 ? styles['item-one'] : ''}
            `}
            key={index}
          >
            <div className={styles.content}>
              <div className={styles.title}>
                <Text tag="h3" variation="subheading-2">
                  {props.title}
                </Text>
              </div>
              <div className={styles.heading}>
                {practice.facilityURL !== null &&
                  practice.facilityURL !== '' && (
                    <TextLink variation="heading-2">
                      <a href={practice.facilityURL}>{practice.name}</a>
                    </TextLink>
                  )}
                {(practice.facilityURL === null ||
                  practice.facilityURL === '') && (
                  <Text tag="h2" variation="heading-2">
                    {practice.name}
                  </Text>
                )}
              </div>
              <div className={styles.address}>
                <Address
                  street1={practice?.address?.street1 || ''}
                  street2={practice?.address?.street2 || ''}
                  city={practice?.address?.city || ''}
                  postcode={practice?.address?.postcode || ''}
                />
              </div>
            </div>
            {practice?.phone?.length > 0 &&
              practice.phone.map((phone: any, index: any) => (
                <div key={index} className={styles['phone-btn']}>
                  {shouldRenderPracticePhones && (
                    <Button variation="full-dark" size="small">
                      <a href={`tel:${phone}`}>
                        <span>
                          <Icons iconName="iconPhone" />
                        </span>
                        <span>{phone}</span>
                      </a>
                    </Button>
                  )}
                  {!shouldRenderPracticePhones && (
                    <Button variation="full-dark" size="small">
                      <a href={`tel:${props.defaultNumber}`}>
                        <span>
                          <Icons iconName="iconPhone" />
                        </span>
                        <span>{props.defaultNumber}</span>
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            {practice?.phone?.length === 0 && (
              <div className={styles['phone-btn']}>
                <Button variation="full-dark" size="small">
                  <a href={`tel:${props.defaultNumber}`}>
                    <span>
                      <Icons iconName="iconPhone" />
                    </span>
                    <span>{props.defaultNumber}</span>
                  </a>
                </Button>
              </div>
            )}
          </div>
        ))}
      {filteredPractices.length === 0 && (
        <div className={styles['phone-btn']}>
          <Button variation="full-dark" size="small">
            <a href={`tel:${props.defaultNumber}`}>
              <span>
                <Icons iconName="iconPhone" />
              </span>
              <span>{props.defaultNumber}</span>
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiplePhoneNumbers;
