import React from 'react';
import { SearchWrapperProps } from './SearchWrapper.types';
import styles from './SearchWrapper.module.scss';

const SearchWrapper = (props: SearchWrapperProps): JSX.Element => {
  const { header, children, searchDetail, showing } = props;
  return (
    <>
      <div className={styles.header}>{header}</div>
      <div className={styles['search-detail']}>
        {searchDetail && <div>{searchDetail}</div>}
        {showing && <div>{showing}</div>}
      </div>

      {children && <div className={styles.children}>{children}</div>}
    </>
  );
};

export default SearchWrapper;
