import React, { useRef } from 'react';
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
    errorMessage,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id}>
          {label}
          {!required && ' (Optional)'}
          {tooltip && tooltip}
        </label>
      )}
      <span className={styles.input}>
        <input id={id} ref={inputRef} type={type} required={required} />

        <span className={styles.cross} onClick={clearInput}>
          <Icons iconName="iconCross" />
        </span>
      </span>

      <div className={styles['error-message']}>
        <Icons iconName="iconWarning" />
        <Text variation="body-medium-medium">{errorMessage}</Text>
      </div>
    </div>
  );
};

export default TextField;
