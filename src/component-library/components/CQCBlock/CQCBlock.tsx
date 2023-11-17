import React from 'react';
import { CQCBlockProps } from './CQCBlock.types';
import styles from './CQCBlock.module.scss';

const CQCBlock = (props: CQCBlockProps): JSX.Element => {
  const { children, logo, rating, size } = props;
  return (
    <div className={styles.wrapper}>
      {logo}
      {children}
    </div>
  );
};

export default CQCBlock;
