import React, { useId, useRef, useState, useEffect, ChangeEvent } from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {
    label,
    name,
    value,
    mode = 'light',
    disabled,
    indeterminate = false,
    onChange,
  } = props;

  const [indeterminateState, setIndeterminateState] = useState(false);
  const [checkedState, setcheckedState] = useState(false);

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setIndeterminateState(indeterminate);
  }, [indeterminate]);

  if (checkboxRef && checkboxRef.current) {
    checkboxRef.current.indeterminate = indeterminateState;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setcheckedState(!checkedState);
    onChange && onChange(e);
  };

  const id = useId();

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        ref={(el) => el && (el.indeterminate = indeterminate)}
        onChange={handleChange}
        checked={checkedState}
      />
      <label htmlFor={id} className={[styles.label, styles[mode]].join(' ')}>
        <span className={styles.text}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
