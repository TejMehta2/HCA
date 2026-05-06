import React, { type JSX } from 'react';
import { TextBlockContainerProps } from './TextBlockContainer.types';
import styles from './TextBlockContainer.module.scss';

const TextBlockContainer = (props: TextBlockContainerProps): JSX.Element => {
  const { children } = props;
  return (
    <div className={styles.background} text-block-container="true">
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default TextBlockContainer;
