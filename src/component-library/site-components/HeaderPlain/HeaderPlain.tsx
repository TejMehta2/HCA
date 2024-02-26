import React from 'react';
import { HeaderPlainProps } from './HeaderPlain.types';
import styles from './HeaderPlain.module.scss';
import Themes from '../../foundation/Themes/Themes';

const HeaderPlain = (props: HeaderPlainProps): JSX.Element => {
  const {
    heading,
    subheading,
    children,
    search,
    theme = 'A-HCA-Main-Turquoise',
    filters,
    sort,
  } = props;

  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {subheading && <div className={styles.subheading}>{subheading}</div>}
          <div className={styles.heading}>{heading}</div>
          {children && <div className={styles['body-copy']}>{children}</div>}
          {search && (
            <div className={styles.search}>
              <div className={styles.searchbar}>{search}</div>
              {filters && <div className={styles.filters}>{filters}</div>}
              {sort && <div className={styles.sort}>{sort}</div>}
            </div>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default HeaderPlain;
