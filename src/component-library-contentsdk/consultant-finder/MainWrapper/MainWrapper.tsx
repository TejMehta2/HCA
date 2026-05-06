import React, { type JSX } from 'react';
import { MainWrapperProps } from './MainWrapper.types';
import styles from './MainWrapper.module.scss';

const MainWrapper = (props: MainWrapperProps): JSX.Element => {
  const { children } = props;
  return <div className={styles['main-wrapper']}>{children}</div>;
};

export default MainWrapper;
