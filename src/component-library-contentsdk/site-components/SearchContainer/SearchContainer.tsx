import React, { MutableRefObject, forwardRef, type JSX } from 'react';
import { SearchContainerProps } from './SearchContainer.types';
import styles from './SearchContainer.module.scss';

const SearchContainer = (
  props: SearchContainerProps,
  ref: MutableRefObject<HTMLDivElement | null>
): JSX.Element => {
  const { children } = props;
  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default forwardRef(SearchContainer);
