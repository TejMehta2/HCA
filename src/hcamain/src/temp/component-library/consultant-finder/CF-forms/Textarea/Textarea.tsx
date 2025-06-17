/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextareaProps } from './Textarea.types';
import styles from './Textarea.module.scss';
import Text from '../../../foundation/Text/Text';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Textarea = (props: TextareaProps): JSX.Element => {
  const {
    id,
    name,
    label,
    required,
    errorMessage,
    maxCharacters = 300,
    helperText,
    isError,
    register,
  } = props;

  const [count, setCount] = useState(0);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          htmlFor={id}
          className={isError ? `${styles['label-error']}` : 'styles.textarea'}
        >
          {label}
          {!required && ' (Optional)'}
        </label>
      )}

      <div
        className={
          isError
            ? `${styles.textarea} ${styles['textarea-error']}`
            : styles.textarea
        }
      >
        <textarea
          id={id}
          {...register(`${name}`, {
            onChange: (e: { target: { value: string | any[] } }) => {
              setCount(e.target.value.length);
            },
          })}
          maxLength={maxCharacters}
        />
        <span
          className={
            isError ? `${styles.count} ${styles['count-error']}` : styles.count
          }
        >
          {count} / {maxCharacters}
        </span>
      </div>

      {isError && <ErrorMessage errorMessage={errorMessage} />}

      {helperText && (
        <div className={styles.helper}>
          <Text variation="body-large">{helperText}</Text>
        </div>
      )}
    </div>
  );
};

export default Textarea;
