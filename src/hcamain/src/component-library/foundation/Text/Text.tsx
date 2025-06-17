import React from 'react';
import { TextProps } from './Text.types';
import styles from './Text.module.scss';
import RichText from '../../core-components/RichText/RichText';

const Text = (props: TextProps): JSX.Element => {
  const {
    tag = 'p',
    variation = 'body-medium',
    children,
    isHtml = false,
  } = props;
  const CustomTag = tag as keyof JSX.IntrinsicElements;
  if (isHtml) {
    return (
      <RichText>
        <div dangerouslySetInnerHTML={{ __html: children as string }} />
      </RichText>
    );
  }
  return <CustomTag className={styles[variation]}>{children}</CustomTag>;
};

export default Text;
