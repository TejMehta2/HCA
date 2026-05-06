import React, { useEffect, useState, type JSX } from 'react';
import { SidePanelProps } from './SidePanel.types';
import styles from './SidePanel.module.scss';

const SidePanel = (props: SidePanelProps): JSX.Element => {
  const { children, isSticky, isMobile, buttons } = props;
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');

      if (header) {
        // console.log('header', header);
        setHeaderHeight(header.offsetHeight);
      }
    };

    if (isSticky) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    return () => {};
  }, [isSticky]);

  const marginTop = isSticky ? headerHeight : 0;
  const className = !isMobile
    ? styles['side-panel']
    : `${styles['side-panel']} ${styles['side-panel-mobile']}`;

  return (
    <div className={className} style={{ top: marginTop }}>
      {children}
      {buttons && <div className={styles.btns}>{buttons}</div>}
    </div>
  );
};

export default SidePanel;
