import React from 'react';
import { VacancyHeaderProps } from './VacancyHeader.types';
import styles from './VacancyHeader.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const VacancyHeader = (props: VacancyHeaderProps): JSX.Element => {
  const { location, clinical, timing, vacancyCode, title, cta } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.container}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.bullets}>
            {location && (
              <div className={styles.location}>
                <Icons iconName={'iconPin'} />
                <Text variation={'body-medium-large'}>{location}</Text>
              </div>
            )}
            {clinical && (
              <div className={styles.clinical}>
                <Icons iconName={'iconStethoscope'} />
                <Text variation={'body-medium-large'}>{clinical}</Text>
              </div>
            )}
            {timing && (
              <div className={styles.timing}>
                <Icons iconName={'iconClock'} />
                <Text variation={'body-medium-large'}>{timing}</Text>
              </div>
            )}
            {vacancyCode && (
              <div className={styles.code}>
                <Icons iconName={'iconGrid'} />
                <Text variation={'body-medium-large'}>{vacancyCode}</Text>
              </div>
            )}
          </div>
          {cta && <div className={styles.cta}>{cta}</div>}
        </div>
      </div>
    </div>
  );
};

export default VacancyHeader;
