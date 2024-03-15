import React from 'react';
import { YextFiltersProps } from './YextFilters.types';
import styles from './YextFilters.module.scss';

const YextFilters = (props: YextFiltersProps): JSX.Element => {
  const { children, label } = props;
  return (
    <div className={styles.wrapper}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.filters}>{children}</div>
    </div>
  );
};

export default YextFilters;
