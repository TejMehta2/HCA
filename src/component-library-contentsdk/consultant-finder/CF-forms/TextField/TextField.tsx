import React, { type JSX } from 'react';
import { TextFieldProps } from './TextField.types';
import styles from './TextField.module.scss';
import Icons from '../../../foundation/Icons/Icons';
import Text from '../../../foundation/Text/Text';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const TextField = (props: TextFieldProps): JSX.Element => {
  const {
    id,
    label,
    helpText,
    type = 'text',
    required = false,
    errorMessage,
    isError,
    register,
    setValue,
    name,
    placeholder,
  } = props;

  const clearInput = () => {
    setValue(`${name}`, '');
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          htmlFor={id}
          className={isError ? `${styles['label-error']}` : ''}
        >
          {label}
          {!required && ' (Optional)'}
        </label>
      )}
      <span className={styles.input}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(`${name}`)}
          className={isError ? `${styles['input-error']}` : ''}
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

      {isError && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default TextField;
