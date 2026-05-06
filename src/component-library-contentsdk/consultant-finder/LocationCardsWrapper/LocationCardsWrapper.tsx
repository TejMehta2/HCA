import React, { type JSX } from 'react';
import { LocationCardsWrapperProps } from './LocationCardsWrapper.types';
import styles from './LocationCardsWrapper.module.scss';

const LocationCardsWrapper = (
  props: LocationCardsWrapperProps
): JSX.Element => {
  const { children } = props;
  return <div className={styles['locations-wrapper']}>{children}</div>;
};

export default LocationCardsWrapper;
