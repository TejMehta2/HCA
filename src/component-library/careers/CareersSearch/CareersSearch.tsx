import React from 'react';
import { CareersSearchProps } from './CareersSearch.types';
import styles from './CareersSearch.module.scss';

const CareersSearch = (props: CareersSearchProps): JSX.Element => {
  const { search, filters, submit } = props;
  return (
    <div className={styles.search}>
      {search}
      <div className={styles['filters-submit']}>
        <div className={styles.filters}>{filters}</div>
        <div className={styles.submit}>{submit}</div>
      </div>
    </div>
  );
};

export default CareersSearch;
