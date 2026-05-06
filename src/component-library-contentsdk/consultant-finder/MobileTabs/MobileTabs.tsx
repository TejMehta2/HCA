import React, { type JSX } from 'react';
import { MobileTabsProps } from './MobileTabs.types';
import styles from './MobileTabs.module.scss';

const MobileTabs = (props: MobileTabsProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.tabs}>{children}</div>;
};

export default MobileTabs;
