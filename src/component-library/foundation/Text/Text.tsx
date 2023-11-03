import React from 'react';
import { TextProps } from './Text.types';
import styles from './Text.module.scss';

const Text = (props: TextProps): JSX.Element => {
  const { tag = 'p', variation = 'body-medium', children } = props;
  const CustomTag = tag as keyof JSX.IntrinsicElements;

  return <CustomTag className={styles[variation]}>{children}</CustomTag>;
};

export default Text;
