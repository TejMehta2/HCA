/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
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
  // Set up a MutationObserver to watch for changes in the DOM look for phone number changes
  useEffect(() => {
    const observer = new MutationObserver(checkPhoneFormat);
    // Observe changes in the body element
    const body = document.body;
    observer.observe(body, {
      childList: true,
      subtree: true,
    });
    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  });

  const checkPhoneFormat = () => {
    const phoneEles = document.getElementsByClassName('phoneText');
    if (phoneEles) {
      const elementsArray = Array.from(phoneEles);
      elementsArray.forEach((el) => {
        if (el.textContent !== phoneFormat(el.textContent)) {
          el.textContent = phoneFormat(el.textContent);
        }
      });
    }
  };

  // A function to re-format a phone number
  const phoneFormat = (
    input: string | null,
    includeCountry: boolean = true
  ) => {
    if (input) {
      // Strip all characters from the input except digits
      input = input?.replace(/\D/g, '');

      // uk prefix?
      let had44: boolean = true;
      if (input.substring(0, 2) === '44') {
        // drop the 44
        input = input.substring(2);
        had44 = true;
      }

      if (input.substring(0, 1) != '0') {
        // no zero?
        input = '0' + input; // add in the zero
      }

      // Based upon the length of the string, we add formatting as necessary
      const size = input?.length;

      if (size < 11) {
        input = input;
      } else if (size == 11 && input.substring(0, 2) !== '07') {
        // standard UK number
        input =
          input.substring(0, 3) +
          ' ' +
          input.substring(3, 7) +
          ' ' +
          input.substring(7, 11);
      } else {
        // uk mobile
        input = input.substring(0, 5) + ' ' + input.substring(5, 11);
      }

      if (had44 && includeCountry) {
        // add +44 and drop leading zero
        input = '(+44) ' + input.substring(1);
      }
    }

    return input;
  };

  const filteredPractices = props.practices.filter(
    (practice: { slug: string }) => practice.slug !== 'video-consultation'
  );

  let shouldRenderPracticePhones = false;

  if (props?.doctifyPhoneSlugs) {
    shouldRenderPracticePhones = props.doctifyPhoneSlugs.includes(props.slug);
  } else if (props?.isDoctifyPhoneNumberConsultant) {
    shouldRenderPracticePhones = props.isDoctifyPhoneNumberConsultant;
  }

  //console.log('slug', props.slug);
  //console.log('shouldRenderPracticePhones', shouldRenderPracticePhones);
  //console.log('default number', props.defaultNumber);

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
                        <span className="phoneText">{phone}</span>
                      </a>
                    </Button>
                  )}
                  {!shouldRenderPracticePhones && (
                    <Button variation="full-dark" size="small">
                      <a href={`tel:${props.defaultNumber}`}>
                        <span>
                          <Icons iconName="iconPhone" />
                        </span>
                        <span className="phoneText">{props.defaultNumber}</span>
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
                    <span className="phoneText">{props.defaultNumber}</span>
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
              <span className="phoneText">{props.defaultNumber}</span>
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiplePhoneNumbers;
