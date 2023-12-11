import React from 'react';
import { RadioButtonProps } from './RadioButton.types';
import styles from './RadioButton.module.scss';

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const { label, id, mode } = props;

  const radioMode = mode ? mode : 'light';

  return (
    <label
      htmlFor={id}
      className={[styles.wrapper, styles[radioMode]].join(' ')}
    >
      <input type="radio" id={id} />
      {label}
    </label>
  );
};

export default RadioButton;
