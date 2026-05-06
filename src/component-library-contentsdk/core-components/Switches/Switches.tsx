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
    <div className={styles[mode]}>
      <label className={styles.switch} htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
        />
        <span className={styles.toggle} />
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  );
};

export default Switches;
