import React from 'react';
import { MarketingPreferencesProps } from './MarketingPreferences.types';
import styles from './MarketingPreferences.module.scss';
import Themes from '../../foundation/Themes/Themes';

const MarketingPreferences = (
  props: MarketingPreferencesProps
): JSX.Element => {
  const { title, bodyCopy, preferences, theme = 'H-HCA-Green-20' } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        {title && <div>{title}</div>}
        {bodyCopy && <div className={styles.copy}>{bodyCopy}</div>}
        {preferences && <div>{preferences}</div>}
      </div>
    </Themes>
  );
};

export default MarketingPreferences;
