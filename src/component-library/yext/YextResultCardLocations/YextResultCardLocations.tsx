import React from 'react';
import { YextResultCardLocationsProps } from './YextResultCardLocations.types';
import styles from './YextResultCardLocations.module.scss';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

const YextResultCardLocations = (
  props: YextResultCardLocationsProps
): JSX.Element => {
  const {
    number,
    image,
    title,
    address,
    phone,
    distance,
    ctas,
    openingHours,
    variation = 'stacked',
  } = props;
  return (
    <div className={[styles.wrapper, styles[variation]].join(' ')}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.content}>
        <div className={styles.heading}>
          {number && <div className={styles.number}>{number}</div>}
          {title && <div className={styles.title}>{title}</div>}
          {distance && <div className={styles.distance}>{distance}</div>}
        </div>
        <div className={styles.inner}>
          <div className={styles.contacts}>
            <div className={styles.address}>
              <span>{address.icon}</span>
              <span>{address.text}</span>
            </div>
            <div className={styles.column}>
              <div className={styles.phone}>
                <span>{phone.icon}</span>
                <span>{phone.text}</span>
              </div>
              <div className={styles.opening}>
                <span>{openingHours.icon}</span>
                <span>{openingHours.text}</span>
              </div>
            </div>
          </div>
          {ctas && (
            <div className={styles.ctas}>
              {ctas.button && (
                <Button variation="full" size="large" contentVariation="card">
                  {ctas.button}
                </Button>
              )}
              {ctas.textButton && <TextButton>{ctas.textButton}</TextButton>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YextResultCardLocations;
