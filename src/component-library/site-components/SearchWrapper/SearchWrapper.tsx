import React from 'react';
import { SearchWrapperProps } from './SearchWrapper.types';
import styles from './SearchWrapper.module.scss';

const SearchWrapper = (props: SearchWrapperProps): JSX.Element => {
  const { subtitle, title, body, children, search, searchDetail, showing } =
    props;
  return (
    <div className={styles.wrapper}>
      <div className={styles['header-wrapper']}>
        <div className={styles.header}>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          {title && <div className={styles.title}>{title}</div>}
          {body && <div className={styles.body}>{body}</div>}
        </div>

        {search && <div className={styles.search}>{search}</div>}

        <div className={styles['search-detail']}>
          {searchDetail && <div>{searchDetail}</div>}
          {showing && <div>{showing}</div>}
        </div>
      </div>
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export default SearchWrapper;
