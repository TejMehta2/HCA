import React from 'react';
import { CareersSearchProps } from './CareersSearch.types';
import styles from './CareersSearch.module.scss';

const CareersSearch = (props: CareersSearchProps): JSX.Element => {
  const { search, filters } = props;
  return (
    <div className={styles.search}>
      {search}
      <div className={styles.filters}>{filters}</div>
    </div>
  );
};

export default CareersSearch;
