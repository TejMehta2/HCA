import React from 'react';
import { ErrorMessageProps } from './ErrorMessage.types';
import styles from './ErrorMessage.module.scss';
import Text from '../../../foundation/Text/Text';
import Icons from '../../../foundation/Icons/Icons';

const ErrorMessage = (props: ErrorMessageProps): JSX.Element => {
  const { errorMessage } = props;

  return (
    <div className={styles['error-message']}>
      <div>
        <Icons iconName="iconWarning" />
      </div>
      <div>
        <Text variation="body-medium-medium">{errorMessage}</Text>
      </div>
    </div>
  );
};

export default ErrorMessage;
