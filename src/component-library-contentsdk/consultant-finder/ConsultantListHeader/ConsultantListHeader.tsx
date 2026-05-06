import React, { type JSX } from 'react';
import { ConsultantListHeaderProps } from './ConsultantListHeader.types';
import styles from './ConsultantListHeader.module.scss';

const ConsultantListHeader = (
  props: ConsultantListHeaderProps
): JSX.Element => {
  const { children } = props;
  return <div className={styles['consultant-list-header']}>
    {children}
  </div>;
};

export default ConsultantListHeader;
