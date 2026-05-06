import React, { type JSX } from 'react';
import { MarketingPreferencesProps } from './MarketingPreferences.types';
import styles from './MarketingPreferences.module.scss';
import Themes from '../../foundation/Themes/Themes';

const MarketingPreferences = (
  props: MarketingPreferencesProps
): JSX.Element => {
  const { title, bodyCopy, preferences } = props;
  return (
    <Themes theme={'K-HCA-Fern-20'}>
      <div className={styles.wrapper}>
        {title && <div>{title}</div>}
        {bodyCopy && <div className={styles.copy}>{bodyCopy}</div>}
        {preferences && <div>{preferences}</div>}
      </div>
    </Themes>
  );
};

export default MarketingPreferences;
