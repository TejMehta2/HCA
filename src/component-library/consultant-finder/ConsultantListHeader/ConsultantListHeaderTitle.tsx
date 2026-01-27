import React from 'react';
import { ConsultantListHeaderProps } from './ConsultantListHeader.types';
import styles from './ConsultantListHeader.module.scss';

const ConsultantListHeaderTtitle = (
  props: ConsultantListHeaderProps
): JSX.Element => {
  const { children } = props;
  return (
    <div
      className={`${styles['consultant-list-header-title']}`}
    >{children}</div>
  );
};

export default ConsultantListHeaderTtitle;
