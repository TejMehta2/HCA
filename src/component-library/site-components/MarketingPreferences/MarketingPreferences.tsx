import React from 'react';
import { MarketingPreferencesProps } from './MarketingPreferences.types';
import styles from './MarketingPreferences.module.scss';

const MarketingPreferences = (
  props: MarketingPreferencesProps
): JSX.Element => {
  const { title, bodyCopy, preferences } = props;
  return (
    <div className={styles.wrapper}>
      {title && <div>{title}</div>}
      {bodyCopy && <div className={styles.copy}>{bodyCopy}</div>}
      {preferences && <div>{preferences}</div>}
    </div>
  );
};

export default MarketingPreferences;
