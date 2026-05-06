import React from 'react';
import { AdvancedBlockHeaderProps } from './AdvancedBlockHeader.types';
import styles from './AdvancedBlockHeader.module.scss';

const AdvancedBlockHeader = (props: AdvancedBlockHeaderProps): JSX.Element => {
  const {
    subtitle,
    title,
    body,
    ctas,
    children,
    paddingSize = 'large',
    contentVariation
  } = props;
  return (
    <div
      className={[
        styles.wrapper,
        styles[paddingSize],
        contentVariation && styles[contentVariation],
      ].join(' ')}
    >
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      {title && <div className={styles.title}>{title}</div>}
      {body && <div className={styles.body}>{body}</div>}
      {children && <div className={styles.children}>{children}</div>}
      {ctas && <div className={styles.ctas}>{ctas}</div>}
    </div>
  );
};

export default AdvancedBlockHeader;
