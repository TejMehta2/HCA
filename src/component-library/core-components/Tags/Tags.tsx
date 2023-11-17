import React from 'react';
import { TagsProps } from './Tags.types';
import styles from './Tags.module.scss';

const Tags = (props: TagsProps): JSX.Element => {
  const { children, theme = '' } = props;
  return <div className={styles[theme]}>{children}</div>;
};

export default Tags;
