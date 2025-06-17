import React, { useState } from 'react';
import { TextareaProps } from './Textarea.types';
import styles from './Textarea.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

const Textarea = (props: TextareaProps): JSX.Element => {
  const {
    id,
    name,
    label,
    required = false,
    errorMessage,
    maxCharacters = 300,
    helperText,
    defaultValue,
    showOptionalText = true,
  } = props;

  const [count, setCount] = useState(defaultValue?.length || 0);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id}>
          {label}
          {!required && showOptionalText && ' (Optional)'}
        </label>
      )}

      <div className={styles.textarea}>
        <textarea
          id={id}
          name={name}
          required={required}
          onChange={(e) => setCount(e.target.value.length)}
          maxLength={maxCharacters}
          defaultValue={defaultValue}
        />
        <span className={styles.count}>
          {count} / {maxCharacters}
        </span>
      </div>

      {errorMessage && (
        <div className={styles['error-message']}>
          <Icons iconName="iconWarning" />
          <Text variation="body-medium-medium">{errorMessage}</Text>
        </div>
      )}

      {helperText && (
        <div className={styles.helper}>
          <Text variation="body-large">{helperText}</Text>
        </div>
      )}
    </div>
  );
};

export default Textarea;
