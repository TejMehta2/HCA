import React from 'react';
import Link from 'next/link';
import { HeaderLDBProps } from './HeaderLDB.types';
import styles from './HeaderLDB.module.scss';

const HeaderLDB = (props: HeaderLDBProps): JSX.Element => {
  return (
    <div className={styles['header-ldb']}>
      <div className={styles['logo']}>
        <Link href={'/'}>{props.logo}</Link>
      </div>
      <div className={styles['progress']}>{props.progress}</div>
    </div>
  );
};

export default HeaderLDB;
