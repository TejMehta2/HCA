import React, { type JSX } from 'react';
import { ErrorMessageProps } from './ErrorMessage.types';
import styles from './ErrorMessage.module.scss';
import { useI18n } from 'next-localization';
import Text from '../../foundation/Text/Text';

const ErrorMessage = (props: ErrorMessageProps): JSX.Element => {
  const { children, contentVariation } = props;
  const { t } = useI18n();

  const fallback = (
    <>
      <Text tag="h2" variation="display-4">
        {t('no-results-found') || 'No results found.'}
      </Text>
      <Text tag="p" variation="body-extra-large">
        {t('try-another-search') || 'Please try another search'}
      </Text>
    </>
  );
  return (
    <div className={styles.wrapper}>
      <div
        className={[
          styles.error,
          contentVariation && styles[contentVariation],
        ].join(' ')}
      >
        {children || fallback}
      </div>
    </div>
  );
};

export default ErrorMessage;
