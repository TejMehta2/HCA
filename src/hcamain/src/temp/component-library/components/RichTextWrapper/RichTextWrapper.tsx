import React from 'react';
import { RichTextWrapperProps } from './RichTextWrapper.types';
import styles from './RichTextWrapper.module.scss';

const RichTextWrapper = (props: RichTextWrapperProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.richText}>{children}</div>;
};

export default RichTextWrapper;
