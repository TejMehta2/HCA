import React, { type JSX } from 'react';
import styles from './Container.module.scss';
import { ContainerProps } from './Container.types';
const Container = (props: ContainerProps): JSX.Element => {
  const {
    children,
    isErrorMsg
  } = props;

  return (
    <div className={styles.wrapper}>
      {
        isErrorMsg &&
        <div className={styles['error-message']}>
          {children}
        </div>
      }
      {
        !isErrorMsg &&
        <div className={styles['content']}>
          {children}
        </div>
      }
    </div>
  );
};

export default Container;
