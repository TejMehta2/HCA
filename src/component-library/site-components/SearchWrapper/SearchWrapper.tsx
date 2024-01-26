import React from 'react';
import { SearchWrapperProps } from './SearchWrapper.types';
import styles from './SearchWrapper.module.scss';

const SearchWrapper = (props: SearchWrapperProps): JSX.Element => {
  const { subtitle, title, body, children } = props;
  return (
    <div className={[styles.wrapper].join(' ')}>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      {title && <div className={styles.title}>{title}</div>}
      {body && <div className={styles.body}>{body}</div>}
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export default SearchWrapper;
