import React, { useEffect, useState } from 'react';
import { SidePanelProps } from './SidePanel.types';
import styles from './SidePanel.module.scss';

const SidePanel = (props: SidePanelProps): JSX.Element => {
  const { children, isSticky } = props;
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header'); // Change this selector according to your header element

      if (header) {
        console.log(header);
        setHeaderHeight(header.offsetHeight);
      }
    };

    if (isSticky) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isSticky]);

  const marginTop = isSticky ? headerHeight : 0;

  return (
    <div className={`${styles['side-panel']}`} style={{ marginTop }}>
      {children}
    </div>
  );
};

export default SidePanel;
