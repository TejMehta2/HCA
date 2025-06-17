import React from 'react';
import { ConsultantListHeaderProps } from './ConsultantListHeader.types';
import styles from './ConsultantListHeader.module.scss';

const ConsultantListHeaderSearch = (
  props: ConsultantListHeaderProps
): JSX.Element => {
  const { children } = props;
  return (
    <div className={styles['consultant-list-header-search']}>{children}</div>
  );
};

export default ConsultantListHeaderSearch;
