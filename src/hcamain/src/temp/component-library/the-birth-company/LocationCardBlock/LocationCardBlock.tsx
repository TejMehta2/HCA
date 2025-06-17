import React from 'react';
import { LocationCardBlockProps } from './LocationCardBlock.types';
import styles from './LocationCardBlock.module.scss';

const LocationCardBlock = (props: LocationCardBlockProps): JSX.Element => {
  const { children, cta } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.cards}>{children}</div>
        <div className={styles.cta}>{cta}</div>
      </div>
    </div>
  );
};

export default LocationCardBlock;
