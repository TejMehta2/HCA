import React, { useEffect, useRef, useState } from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {
    label,
    name,
    id,
    value,
    mode = 'light',
    disabled,
    indeterminate = false,
    defaultChecked,
    onChange,
    checked,
  } = props;

  const [indeterminateState, setIndeterminateState] = useState(false);
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setIndeterminateState(indeterminate);
  }, [indeterminate, checked]);

  if (checkboxRef && checkboxRef.current) {
    checkboxRef.current.indeterminate = indeterminateState;
  }

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        ref={(el) => el && (el.indeterminate = indeterminate)}
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id} className={[styles.label, styles[mode]].join(' ')}>
        <span className={styles.text}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
