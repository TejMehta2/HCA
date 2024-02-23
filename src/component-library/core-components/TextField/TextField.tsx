import React, { useState } from 'react';
import { TextFieldProps } from './TextField.types';
import styles from './TextField.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

const TextField = (props: TextFieldProps): JSX.Element => {
  const {
    id,
    label,
    tooltip,
    type = 'text',
    required = false,
    pattern,
    errorMessage,
  } = props;

  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (!pattern) return;
    setHasError(!!!event.target.value.match(pattern));
  };

  return (
    <div className={`${styles.wrapper} ${hasError ? styles.error : ''}`}>
      {label && (
        <label htmlFor={id}>
          {label}
          {!required && ' (Optional)'}
          {tooltip && tooltip}
        </label>
      )}
      <span className={styles.input}>
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          pattern={pattern}
          onChange={onChangeHandler}
        />
        {value && (
          <span className={styles.cross} onClick={() => setValue('')}>
            <Icons iconName="iconCross" />
          </span>
        )}
      </span>
      {hasError && (
        <div className={styles['error-message']}>
          <Icons iconName="iconWarning" />
          <Text variation="body-medium-medium">{errorMessage}</Text>
        </div>
      )}
    </div>
  );
};

export default TextField;
