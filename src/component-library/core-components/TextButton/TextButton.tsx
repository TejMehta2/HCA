import React from 'react';
import { TextButtonProps } from './TextButton.types';
import styles from './TextButton.module.scss';

const TextButton = (props: TextButtonProps): JSX.Element => {
  const { theme = 'dark', children, onClick } = props;
  return (
    <div
      className={[styles['text-button'], styles[theme]].join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TextButton;
