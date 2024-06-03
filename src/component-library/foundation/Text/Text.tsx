import React from 'react';
import { TextProps } from './Text.types';
import styles from './Text.module.scss';

const Text = (props: TextProps): JSX.Element => {
  const {
    tag = 'p',
    variation = 'body-medium',
    children,
    isHtml = false,
  } = props;
  const CustomTag = tag as keyof JSX.IntrinsicElements;
  if (isHtml) {
    <CustomTag className={styles[variation]}>
      <span dangerouslySetInnerHTML={{ __html: children as string }} />
    </CustomTag>;
  }
  return <CustomTag className={styles[variation]}>{children}</CustomTag>;
};

export default Text;
