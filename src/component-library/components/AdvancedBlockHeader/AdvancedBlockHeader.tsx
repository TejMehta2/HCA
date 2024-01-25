import React from 'react';
import { AdvancedBlockHeaderProps } from './AdvancedBlockHeader.types';
import styles from './AdvancedBlockHeader.module.scss';

const AdvancedBlockHeader = (props: AdvancedBlockHeaderProps): JSX.Element => {
  const { subtitle, title, body, ctas, children } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
      <div className={styles.children}>{children}</div>
      <div className={styles.ctas}>{ctas}</div>
    </div>
  );
};

export default AdvancedBlockHeader;
