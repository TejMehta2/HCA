import React, { type JSX } from 'react';
import { ServiceCardsProps } from './ServiceCards.types';
import styles from './ServiceCards.module.scss';
import Button from '../../core-components/Button/Button';
import Themes from '../../foundation/Themes/Themes';

const ServiceCards = (props: ServiceCardsProps): JSX.Element => {
  const {
    children,
    title,
    subtitle,
    bodyText,
    cta,
    id,
    theme = 'I-HCA-Goldenrod',
    contentVariation = 'service',
    tableOfContentTitle
  } = props;

  return (
    <Themes theme={theme} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper} id={id}>
        <div className={styles.container}>
          <div className={styles['sticky-track']}>
            <div className={styles['sticky']}>
              <div className={styles.subtitle}>{subtitle}</div>
              <div className={styles.title}>{title}</div>
              <div className={styles['body-text']}>{bodyText}</div>
              <div className={styles.cta}>
                <Button size="large" variation="outline-dark">
                  {cta}
                </Button>
              </div>
            </div>
          </div>
          <div
            className={[
              styles.cards,
              contentVariation === 'service' ? styles.service : styles.role,
            ].join(' ')}
          >
            {children}
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default ServiceCards;
