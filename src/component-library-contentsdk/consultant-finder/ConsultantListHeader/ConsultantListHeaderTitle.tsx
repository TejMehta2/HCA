import React from 'react';
import { ConsultantListHeaderProps } from './ConsultantListHeader.types';
import styles from './ConsultantListHeader.module.scss';

const ConsultantListHeaderTtitle = (
  props: ConsultantListHeaderProps
): JSX.Element => {
  const { children, title, locationSearch } = props;
  return (
    <div
      className={`${styles['consultant-list-header-title']} ${locationSearch ? styles['has-location-search'] : ''
        }`}
    >
      {
        title &&
        <div>{title}</div>
      }
      {
        locationSearch &&
        <div className={styles['location-search']}>{locationSearch}</div>
      }
      {children}</div>
  );
};

export default ConsultantListHeaderTtitle;
