/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { PracticeProps } from './Practice.types';
import styles from './Practice.module.scss';
import Text from '../../../foundation/Text/Text';
import {
  capitalizeFirstLetter,
  isObjectDefined,
} from '../../../utility-functions';
import Icons from '../../../foundation/Icons/Icons';
import TextButton from '../../../core-components/TextButton/TextButton';
import TextLink from '../../../core-components/TextLink/TextLink';

const Locations = (props: PracticeProps): JSX.Element => {
  // address
  const addressItems = [];
  const address: string[] = [];
  addressItems.push(props.street1, props.street2, props.city, props.postcode);

  addressItems.forEach((item) => {
    if (item !== null && item !== '' && item?.length > 0) {
      address.push(capitalizeFirstLetter(item));
    }
  });

  const printAddress = address.toString().split(',').join(', ');

  // working hours
  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const convertTime = (time: any) => {
    const timeString12hr = new Date(
      '1970-01-01T' + time + 'Z'
    ).toLocaleTimeString('en-US', {
      timeZone: 'UTC',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });
    return timeString12hr;
  };

  return (
    <div className={styles.practice}>
      {props.slug !== 'video-consultation' && (
        <div>
          {props.facilityURL !== null && props.facilityURL !== '' && (
            <TextLink>
              <a href={props.facilityURL}>{props.name}</a>
            </TextLink>
          )}
          {(props.facilityURL === null || props.facilityURL === '') && (
            <Text tag="p" variation="body-medium-extra-large">
              {props.name}
            </Text>
          )}
          <div className={styles.address}>
            <div className={styles.icon}>
              <Icons iconName="iconPin" />
            </div>
            <Text tag="p" variation="body-medium-large">
              {printAddress}
            </Text>
          </div>
          <div className={styles['working-hours']}>
            <div className={styles.icon}>
              <Icons iconName="iconClock" />
            </div>
            <div>
              {isObjectDefined(props.workingOpeningHours) && (
                <ul>
                  {Object.keys(props.workingOpeningHours).map(
                    (key: any, index: any) => (
                      <li key={index}>
                        <Text tag="span" variation="body-medium-large">
                          {weekDays[key - 1]}:{' '}
                        </Text>
                        {props.workingOpeningHours[key].length > 0 &&
                          props.workingOpeningHours[key].map(
                            (time: any, index: any) => (
                              <div key={index}>
                                <Text tag="span" variation="body-medium-large">
                                  {convertTime(time.open)} -{' '}
                                  {convertTime(time.close)}
                                </Text>
                              </div>
                            )
                          )}{' '}
                        {props.workingOpeningHours[key].length === 0 && (
                          <Text tag="span" variation="body-medium-large">
                            Unavailable
                          </Text>
                        )}
                      </li>
                    )
                  )}
                </ul>
              )}
              {!isObjectDefined(props.workingOpeningHours) && (
                <Text tag="p" variation="body-medium-large">
                  Unavailable
                </Text>
              )}
            </div>
          </div>
          {props.lat !== null &&
            props.lat !== '' &&
            props.long !== null &&
            props.long !== '' && (
              <TextButton>
                <a
                  href={`https://maps.google.com/?q=${props.lat},${props.long}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {props.viewOnGoogleMapsText}
                </a>
              </TextButton>
            )}
        </div>
      )}
    </div>
  );
};

export default Locations;
