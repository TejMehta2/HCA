import React, { type JSX } from 'react';
import { ConsultantListHeaderProps } from './ConsultantListHeader.types';
import styles from './ConsultantListHeader.module.scss';

const ConsultantListHeaderFilters = (
  props: ConsultantListHeaderProps
): JSX.Element => {
  const { children } = props;
  return (
    <div className={styles['consultant-list-header-filters']}>{children}</div>
  );
};

export default ConsultantListHeaderFilters;
