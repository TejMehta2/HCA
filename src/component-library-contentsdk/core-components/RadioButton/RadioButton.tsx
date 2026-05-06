import React, { useId, type JSX } from 'react';
import { RadioButtonProps } from './RadioButton.types';
import styles from './RadioButton.module.scss';

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const { label, name, value, disabled, onChange, checked } = props;

  const id = useId();

  return (
    <label htmlFor={id} className={styles.wrapper}>
      <input
        type="radio"
        id={id}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {label}
    </label>
  );
};

export default RadioButton;
