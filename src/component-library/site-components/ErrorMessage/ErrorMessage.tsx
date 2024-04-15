import React from 'react';
import { ErrorMessageProps } from './ErrorMessage.types';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = (props: ErrorMessageProps): JSX.Element => {
  const { children, contentVariation } = props;

  return (
    <div className={styles.wrapper}>
      <div
        className={[
          styles.error,
          contentVariation && styles[contentVariation],
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
};

export default ErrorMessage;
