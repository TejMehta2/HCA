import React, { useId, useState } from 'react';
import { PhoneFieldProps } from './PhoneField.types';
import styles from './PhoneField.module.scss';
import 'intl-tel-input/build/css/intlTelInput.css';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import IntlTelInput from 'intl-tel-input/react';

const PhoneField = (props: PhoneFieldProps): JSX.Element => {
  const { label, required = false, helpText } = props;
  const inputId = useId();

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [, setNumber] = useState<number | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = () => {
    const errorMap: string[] = [
      'Invalid number',
      'Invalid country code',
      'Too short',
      'Too long',
      'Invalid number',
    ];

    if (isValid) {
      setNotice(null);
    } else {
      const errorMessage = errorMap[errorCode || 0] || 'Invalid number';
      setNotice(`${errorMessage}`);
    }
  };

  return (
    <div className={[styles.container, notice ? styles.error : ''].join(' ')}>
      {label && (
        <label htmlFor={inputId}>
          {label}
          {!required && ' (Optional)'}
        </label>
      )}

      <IntlTelInput
        inputProps={{
          id: inputId,
          className: styles.input,
          required: required,
          onBlur: handleSubmit,
        }}
        // eslint-disable-next-line
        // @ts-ignore
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initOptions={{
          nationalMode: false,
          initialCountry: 'gb',
          // eslint-disable-next-line
          // @ts-ignore
          countrySearch: false,
          strictMode: true,
          utilsScript:
            'https://cdn.jsdelivr.net/npm/intl-tel-input@21.0.0/build/js/utils.js',
        }}
      />

      <div
        className={[styles['error-message'], notice ? '' : styles.hidden].join(
          ' '
        )}
      >
        <Icons iconName="iconWarning" />
        <Text variation="body-medium-medium">{notice}</Text>
      </div>

      {helpText && (
        <div className={styles['help-text']}>
          <Text tag="small" variation="body-large">
            {helpText}
          </Text>
        </div>
      )}
    </div>
  );
};

export default PhoneField;
