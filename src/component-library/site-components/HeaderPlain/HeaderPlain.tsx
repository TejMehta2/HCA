import React from 'react';
import { HeaderPlainProps } from './HeaderPlain.types';
import styles from './HeaderPlain.module.scss';

const HeaderPlain = (props: HeaderPlainProps): JSX.Element => {
  const { heading, subheading, children } = props;

  return (
    <div className={styles.grid}>
      <div className={styles.subheading}>{subheading}</div>
      <div className={styles.heading}>{heading}</div>
      <div className={styles['body-copy']}>{children}</div>
    </div>
  );
};

export default HeaderPlain;
