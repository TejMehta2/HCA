import React from 'react';
import { TextBlockHeaderProps } from './TextBlockHeader.types';
import styles from './TextBlockHeader.module.scss';

const TextBlockHeader = (props: TextBlockHeaderProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.wrapper}>{children}</div>;
};

export default TextBlockHeader;
