'use client';

import React, { useRef, type JSX } from 'react';
import { TextFieldProps } from './TextField.types';
import styles from './TextField.module.scss';
import Icons from '../../../../foundation/Icons/Icons';
import Text from '../../../../foundation/Text/Text';

const TextField = (props: TextFieldProps): JSX.Element => {
  const {
    name,
    label,
    helpText,
    type = 'text',
    error,
    defaultValue,
    placeholder,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <span className={styles.input}>
        <input
          name={name}
          id={name}
          ref={inputRef}
          type={type}
          className={styles['input-field']}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />

        <span className={styles.cross} onClick={clearInput}>
          <Icons iconName="iconCross" />
        </span>
      </span>

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

export default TextField;
