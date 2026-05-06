import React, { type JSX } from 'react';
import { CardBlogProps } from './CardBlog.types';
import styles from './CardBlog.module.scss';

const CardBlog = (props: CardBlogProps): JSX.Element => {
  const { children, variation = 'default' } = props;
  return (
    <div className={[styles.card, styles[variation]].join(' ')}>{children}</div>
  );
};

export default CardBlog;
