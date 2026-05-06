import React, { type JSX } from 'react';
import { VacancyHeaderProps } from './VacancyHeader.types';
import styles from './VacancyHeader.module.scss';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';

const VacancyHeader = (props: VacancyHeaderProps): JSX.Element => {
  const { location, city, clinical, timing, vacancyCode, title, cta, image } =
    props;
  return (
    <Themes theme="B-HCA-Navy-Blue">
      <div className={styles.wrapper}>
        {image && <div className={styles.image}>{image}</div>}
        <div className={styles.container}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.bullets}>
            {location && (
              <div>
                <Icons iconName={'iconHome'} />
                <Text variation={'body-medium-large'}>{location}</Text>
              </div>
            )}
            {city && (
              <div>
                <Icons iconName={'iconPin'} />
                <Text variation={'body-medium-large'}>{city}</Text>
              </div>
            )}
            {clinical && (
              <div>
                <Icons iconName={'iconStethoscope'} />
                <Text variation={'body-medium-large'}>{clinical}</Text>
              </div>
            )}
            {timing && (
              <div>
                <Icons iconName={'iconClock'} />
                <Text variation={'body-medium-large'}>{timing}</Text>
              </div>
            )}
            {vacancyCode && (
              <div>
                <Icons iconName={'iconGrid'} />
                <Text variation={'body-medium-large'}>{vacancyCode}</Text>
              </div>
            )}
          </div>
          {cta && <div className={styles.cta}>{cta}</div>}
        </div>
      </div>
    </Themes>
  );
};

export default VacancyHeader;
