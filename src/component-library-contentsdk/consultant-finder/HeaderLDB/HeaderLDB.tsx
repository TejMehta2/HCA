import React from 'react';
import { HeaderLDBProps } from './HeaderLDB.types';
import styles from './HeaderLDB.module.scss';

const HeaderLDB = (props: HeaderLDBProps): JSX.Element => {
  return (
    <div className={styles['header-ldb']}>
      <div className={styles['logo']}>
        <a href={'/'}>{props.logo}</a>
      </div>
      <div className={styles['progress']}>{props.progress}</div>
    </div>
  );
};

export default HeaderLDB;
