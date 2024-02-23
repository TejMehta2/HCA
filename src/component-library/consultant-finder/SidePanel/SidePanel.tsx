import React from 'react';
import { SidePanelProps } from './SidePanel.types';
import styles from './SidePanel.module.scss';

const SidePanel = (props: SidePanelProps): JSX.Element => {
  const { children } = props;
  return <div className={`${styles['side-panel']}`}>{children}</div>;
};

export default SidePanel;
