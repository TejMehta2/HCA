import React, { type JSX } from 'react';
import { YextResultCardCareersProps } from './YextResultCardCareers.types';
import styles from './YextResultCardCareers.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const YextResultCardCareers = (
  props: YextResultCardCareersProps
): JSX.Element => {
  const { city, location, clinical, timing, title, cta, variation } = props;
  return (
    <div
      className={[
        styles.wrapper,
        variation === 'carousel' && styles.carousel,
      ].join(' ')}
    >
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.bullets}>
          {location && (
            <div className={styles.location}>
              <Icons iconName={'iconHome'} />
              <Text variation="body-medium-large">{location}</Text>
            </div>
          )}
          {city && (
            <div className={styles.city}>
              <Icons iconName={'iconPin'} />
              <Text variation="body-medium-large">{city}</Text>
            </div>
          )}
          {clinical && (
            <div className={styles.clinical}>
              <Icons iconName={'iconStethoscope'} />
              <Text variation="body-medium-large">{clinical}</Text>
            </div>
          )}
          {timing && (
            <div className={styles.timing}>
              <Icons iconName={'iconClock'} />
              <Text variation="body-medium-large">{timing}</Text>
            </div>
          )}
        </div>
      </div>
      <div className={styles.cta}>{cta}</div>
    </div>
  );
};

export default YextResultCardCareers;
