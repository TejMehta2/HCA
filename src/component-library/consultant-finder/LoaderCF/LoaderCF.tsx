import React from 'react';
import styles from './LoaderCF.module.scss';
import Loader from '../../foundation/Loader/Loader';

const LoaderCF = (): JSX.Element => {
  return (
    <div className={styles.loader}>
      <Loader theme={'dark'} />
    </div>
  );
};

export default LoaderCF;
