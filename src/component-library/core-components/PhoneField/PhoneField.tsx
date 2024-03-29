import React, { useId, useState } from 'react';
import { PhoneFieldProps } from './PhoneField.types';
import styles from './PhoneField.module.scss';

import IntlTelInput from 'intl-tel-input/react/build/IntlTelInput.esm';
import 'intl-tel-input/build/css/intlTelInput.css';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

const PhoneField = (props: PhoneFieldProps): JSX.Element => {
  const { label, required = false, helpText } = props;
  const inputId = useId();

  // const [isValid, setIsValid] = useState(null);
  // const [number, setNumber] = useState(null);
  // const [errorCode, setErrorCode] = useState(null);
  // const [notice, setNotice] = useState(null);

  // const handleSubmit = () => {
  //   const errorMap: string[] = [
  //     'Invalid number',
  //     'Invalid country code',
  //     'Too short',
  //     'Too long',
  //     'Invalid number',
  //   ];

  //   if (isValid) {
  //     setNotice(null);
  //   } else {
  //     const errorMessage = errorMap[errorCode] || 'Invalid number';
  //     setNotice(`${errorMessage}`);
  //   }
  // };

  return (
    <div className={styles.container}>
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
        }}
        // onChangeNumber={setNumber}
        // onChangeValidity={setIsValid}
        // onChangeErrorCode={setErrorCode}
        initOptions={{
          nationalMode: false,
          initialCountry: 'gb',
          utilsScript:
            'https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js', // just for formatting/placeholders etc
        }}
      />

      {helpText && (
        <div className={styles['help-text']}>
          <Text tag="small" variation="body-large">
            {helpText}
          </Text>
        </div>
      )}

      {/* <div
        className={[styles['error-message'], notice ? '' : styles.hidden].join(
          ' '
        )}
      >
        <Icons iconName="iconWarning" />
        <Text variation="body-medium-medium">{notice}</Text>
      </div> */}

      {/* <button type="button" onClick={handleSubmit}>
        Validate
      </button> */}
    </div>
  );
};

export default PhoneField;
