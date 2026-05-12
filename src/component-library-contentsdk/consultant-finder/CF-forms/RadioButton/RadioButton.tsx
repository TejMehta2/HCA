'use client';

import React, { useId, type JSX } from 'react';
import { RadioButtonProps } from './RadioButton.types';
import styles from './RadioButton.module.scss';

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const { label, name, value, mode = 'light', checked, register } = props;

  const id = useId();

  return (
    <label htmlFor={id} className={[styles.wrapper, styles[mode]].join(' ')}>
      <input
        type="radio"
        id={id}
        {...register(`${name}`)}
        value={value}
        checked={checked}
      />
      {label}
    </label>
  );
};

export default RadioButton;
