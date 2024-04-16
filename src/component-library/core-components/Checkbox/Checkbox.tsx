import React, { useEffect, useRef, useState } from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {
    label,
    name,
    id,
    value,
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
      <div className={styles['input-wrapper']}>
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
      </div>
      <label htmlFor={id} className={styles.label}>
        <span className={styles.text}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
