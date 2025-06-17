import React from 'react';
import { CareersSearchResultsProps } from './CareersSearchResults.types';
import styles from './CareersSearchResults.module.scss';

const CareersSearchResults = (
  props: CareersSearchResultsProps
): JSX.Element => {
  const { header, count, results, cta } = props;
  return (
    <div className={styles.container}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.count}>{count}</div>
      <div className={styles.results}>{results}</div>
      <div className={styles.cta}>{cta}</div>
    </div>
  );
};

export default CareersSearchResults;
