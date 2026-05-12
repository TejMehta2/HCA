'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, type JSX } from 'react';
import { SelectFieldProps } from './SelectField.types';
import styles from './SelectField.module.scss';
import Icons from '../../../foundation/Icons/Icons';
import Text from '../../../foundation/Text/Text';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SelectField = (props: SelectFieldProps): JSX.Element => {
  const {
    id,
    label,
    name,
    helpText,
    required,
    errorMessage,
    options,
    register,
    isError,
    addDefaultValue,
    defaultValueLabel,
    defaultValue,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {label && (
        <label htmlFor={id}>
          {label}
          {!required && ' (Optional)'}
        </label>
      )}
      <div className={styles['select-wrapper']}>
        <select id={name} {...register(`${name}`)}>
          {addDefaultValue && (
            <option value={defaultValue || ''}>{defaultValueLabel}</option>
          )}
          {options}
        </select>
        <span className={styles.arrow}>
          <Icons iconName="iconChevronDown" />
        </span>
      </div>

      {helpText && (
        <div className={styles['help-text']}>
          <Text tag="small" variation="body-large">
            {helpText}
          </Text>
        </div>
      )}

      {isError && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default SelectField;
