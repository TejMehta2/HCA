import React, { FormEvent, useId, useState } from 'react';
import { PhoneFieldProps } from './PhoneField.types';
import styles from './PhoneField.module.scss';
import 'intl-tel-input/build/css/intlTelInput.css';
import Icons from '../../../../foundation/Icons/Icons';
import Text from '../../../../foundation/Text/Text';
import IntlTelInput from 'intl-tel-input/react';

const PhoneField = (props: PhoneFieldProps): JSX.Element => {
  const { label, helpText, name, error } = props;
  const randomId = useId();
  const inputId = name || randomId;
  const [value, setValue] = useState('');
  return (
    <div className={[styles.container, error ? styles.error : ''].join(' ')}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <IntlTelInput
        inputProps={{
          name,
          defaultValue: value,
          id: inputId,
          className: styles.input,
          onBlur: (event: FormEvent<HTMLInputElement>) => {
            const target = event.target as HTMLInputElement;
            setValue(target.value?.replace(' ', '') || '');
          },
        }}
        initOptions={{
          nationalMode: false,
          initialCountry: 'gb',
          utilsScript:
            'https://cdn.jsdelivr.net/npm/intl-tel-input@21.0.0/build/js/utils.js',
          validationNumberType: null,
        }}
      />

      {helpText && (
        <div className={styles['help-text']}>
          <Text tag="small" variation="body-large">
            {helpText}
          </Text>
        </div>
      )}

      {error && (
        <div className={styles['error-message']}>
          <Icons iconName="iconWarning" />
          <Text variation="body-medium-medium">{error}</Text>
        </div>
      )}
    </div>
  );
};

export default PhoneField;
