import React, { useId } from 'react';
import { RadioButtonProps } from './RadioButton.types';
import styles from './RadioButton.module.scss';

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const { label, name, value, mode = 'light', disabled } = props;

  const id = useId();

  return (
    <label htmlFor={id} className={[styles.wrapper, styles[mode]].join(' ')}>
      <input
        type="radio"
        id={id}
        name={name}
        disabled={disabled}
        value={value}
      />
      {label}
    </label>
  );
};

export default RadioButton;
