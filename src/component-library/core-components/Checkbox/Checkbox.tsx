import React, { useId } from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const { label, mode = 'light' } = props;

  const id = useId();

  return (
    <div className={styles.wrapper}>
      <input type="checkbox" id={id} />
      <label htmlFor={id} className={[styles.label, styles[mode]].join(' ')}>
        <span className={styles.text}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
