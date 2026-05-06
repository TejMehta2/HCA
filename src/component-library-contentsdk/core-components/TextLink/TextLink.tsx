import React, { type JSX } from 'react';
import { TextLinkProps } from './TextLink.types';
import styles from './TextLink.module.scss';

const TextLink = (props: TextLinkProps): JSX.Element => {
  const { children, variation = 'body-medium-large', full = false } = props;
  return (
    <div
      className={[
        styles['text-link'],
        styles[full ? 'full' : ''],
        styles[variation],
      ].join(' ')}
    >
      {children}
    </div>
  );
};

export default TextLink;
