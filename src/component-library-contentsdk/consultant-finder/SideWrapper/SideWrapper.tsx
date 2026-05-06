import React, { type JSX } from 'react';
import { SideWrapperProps } from './SideWrapper.types';
import styles from './SideWrapper.module.scss';

const SideWrapper = (props: SideWrapperProps): JSX.Element => {
  const { children } = props;
  return <div className={styles['side-wrapper']}>{children}</div>;
};

export default SideWrapper;
