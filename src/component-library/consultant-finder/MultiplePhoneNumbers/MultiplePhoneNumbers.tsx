/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MultiplePhoneNumbersProps } from './MultiplePhoneNumbers.types';
import Address from '../Address/Address';
import Text from '../../foundation/Text/Text';
import styles from './MultiplePhoneNumbers.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Button from '../../core-components/Button/Button';

const MultiplePhoneNumbers = (
  props: MultiplePhoneNumbersProps
): JSX.Element => {
  const filteredPractices = props.practices.filter(
    (practice: { slug: string }) => practice.slug !== 'video-consultation'
  );

  return (
    <div className={styles.phones}>
      {/* daca practice e mai mare de 0 atunci arata-le, daca e 0 atunci arata default */}
      {filteredPractices.length > 0 &&
        filteredPractices.map((practice: any, index: any) => (
          <div className={styles.item} key={index}>
            <div className={styles.content}>
              <div className={styles.title}>
                <Text tag="h3" variation="subheading-2">
                  {props.title}
                </Text>
              </div>
              <div className={styles.heading}>
                <Text tag="h2" variation="heading-2">
                  {practice?.name}
                </Text>
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
                <div key={index}>
                  <Button variation="full-dark" size="small">
                    <button>
                      <span>
                        <Icons iconName="iconPhone" />
                      </span>
                      <span>{phone}</span>
                    </button>
                  </Button>
                </div>
              ))}
            {practice?.phone?.length === 0 && (
              <div className={styles['phone-btn']}>
                <Button variation="full-dark" size="small">
                  <button>
                    <span>
                      <Icons iconName="iconPhone" />
                    </span>
                    <span>Default phone</span>
                  </button>
                </Button>
              </div>
            )}
          </div>
        ))}
      {filteredPractices.length === 0 && (
        <div className={styles['phone-btn']}>
          <Button variation="full-dark" size="small">
            <button>
              <span>
                <Icons iconName="iconPhone" />
              </span>
              <span>Default phone</span>
            </button>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiplePhoneNumbers;
