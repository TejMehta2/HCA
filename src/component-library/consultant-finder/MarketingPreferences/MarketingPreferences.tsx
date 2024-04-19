import React from 'react';
import { MarketingPreferencesProps } from './MarketingPreferences.types';
import styles from './MarketingPreferences.module.scss';

const MarketingPreferences = (
  props: MarketingPreferencesProps
): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default MarketingPreferences;
