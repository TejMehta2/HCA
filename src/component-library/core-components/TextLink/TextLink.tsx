import React from 'react';
import { TextLinkProps } from './TextLink.types';
import styles from './TextLink.module.scss';

const TextLink = (props: TextLinkProps): JSX.Element => {
  const { children } = props;
  return <div className={styles['text-link']}>{children}</div>;
};

export default TextLink;
