import React, { type JSX } from 'react';
import { TextButtonProps } from './TextButton.types';
import styles from './TextButton.module.scss';

const TextButton = (props: TextButtonProps): JSX.Element => {
  const { theme, children } = props;
  return (
    <div
      className={[styles['text-button'], `${theme && styles[theme]}`].join(' ')}
    >
      {children}
    </div>
  );
};

export default TextButton;
