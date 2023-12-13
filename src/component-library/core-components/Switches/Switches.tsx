import React, { useState, useId } from 'react';
import { SwitchesProps } from './Switches.types';
import styles from './Switches.module.scss';

const Switches = (props: SwitchesProps): JSX.Element => {
  const { label, mode = 'light', disabled } = props;

  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  const id = useId();

  return (
    <div className={[styles.wrapper, styles[mode]].join(' ')}>
      <div className={styles.switch}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
        />
        <label htmlFor={id} className={styles.toggle} />
      </div>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default Switches;
