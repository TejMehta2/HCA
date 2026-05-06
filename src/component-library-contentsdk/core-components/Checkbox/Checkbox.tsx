import React, { useEffect, useRef, useState, type JSX } from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

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
    required,
    errorMessage,
  } = props;

  const [indeterminateState, setIndeterminateState] = useState(false);
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setIndeterminateState(indeterminate);
  }, [indeterminate, checked]);

  if (checkboxRef && checkboxRef.current) {
    checkboxRef.current.indeterminate = indeterminateState;
  }

  const stateProps =
    typeof defaultChecked === 'boolean'
      ? { defaultChecked }
      : { onChange, checked };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles['input-wrapper']}>
            <input
              type="checkbox"
              id={id}
              name={name}
              value={value}
              disabled={disabled}
              ref={(el) => {
                el && (el.indeterminate = indeterminate);
              }}
              required={required}
              {...stateProps}
            />
          </div>
          <label htmlFor={id} className={styles.label}>
            <span className={styles.text}>{label}</span>
          </label>
        </div>
        <div className={styles['error-message']}>
          <Icons iconName="iconWarning" />
          <Text variation="body-medium-medium">{errorMessage}</Text>
        </div>
      </div>
    </>
  );
};

export default Checkbox;
