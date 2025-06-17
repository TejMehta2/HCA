import React from 'react';
import { CardLocationProps } from './CardLocation.types';
import styles from './CardLocation.module.scss';
import Button from '../../core-components/Button/Button';

const CardLocation = (props: CardLocationProps): JSX.Element => {
  const { quantity, title, subtitle, cta, icon } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {quantity && <div className={styles.quantity}>{quantity}</div>}
        {title && <div className={styles.title}>{title}</div>}
      </div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      {icon && <div className={styles.icon}>{icon}</div>}
      {cta && (
        <div className={styles.cta}>
          <Button size={'small'} variation={'outline'}>
            {cta}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardLocation;
