import React from 'react';
import { TextBlockHeaderProps } from './TextBlockHeader.types';
import styles from './TextBlockHeader.module.scss';

const TextBlockHeader = (props: TextBlockHeaderProps): JSX.Element => {
  const { children, id } = props;
  return (
    <div className={styles.wrapper} id={id}>
      {children}
    </div>
  );
};

export default TextBlockHeader;
