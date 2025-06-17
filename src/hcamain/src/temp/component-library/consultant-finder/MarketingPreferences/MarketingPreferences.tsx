import React from 'react';
import { MarketingPreferencesProps } from './MarketingPreferences.types';
import Text from '../../foundation/Text/Text';
import styles from './MarketingPreferences.module.scss';

const MarketingPreferences = (
  props: MarketingPreferencesProps
): JSX.Element => {
  const { children, headline, text } = props;
  return (
    <div className={styles['cf-marketing-preferences']}>
      <div className={styles.headline}>
        <Text tag="h3" variation="body-medium-extra-large">
          {headline}
        </Text>
      </div>
      <div className={styles.text}>
        <Text tag="div" variation="body-extra-large">
          {text}
        </Text>
      </div>
      {children}
    </div>
  );
};

export default MarketingPreferences;
