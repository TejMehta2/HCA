/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type JSX } from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {
    label,
    name,
    id,
    value,
    disabled,
    defaultChecked,
    register,
    setValue,
  } = props;

  // const checkboxRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles['input-wrapper']}>
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          defaultChecked={defaultChecked}
          {...register(`${name}`, {
            onChange: (e: { target: { value: string | any[] } }) => {
              // console.log(e.target.value);
              setValue && setValue(`${name}`, e.target.value);
            },
          })}
        />
      </div>
      <label htmlFor={id} className={styles.label}>
        <span className={styles.text}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
