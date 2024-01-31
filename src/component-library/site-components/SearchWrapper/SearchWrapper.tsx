import React from 'react';
import { SearchWrapperProps } from './SearchWrapper.types';
import styles from './SearchWrapper.module.scss';
import Themes from '../../foundation/Themes/Themes';

const SearchWrapper = (props: SearchWrapperProps): JSX.Element => {
  const {
    header,
    children,
    searchDetail,
    showing,
    theme = 'F-HCA-White',
  } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.header}>{header}</div>
        <div className={styles['search-detail']}>
          {searchDetail && <div>{searchDetail}</div>}
          {showing && <div>{showing}</div>}
        </div>

        {children && <div className={styles.children}>{children}</div>}
      </div>
    </Themes>
  );
};

export default SearchWrapper;
