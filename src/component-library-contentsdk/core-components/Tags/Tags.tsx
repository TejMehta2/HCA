import React, { type JSX } from 'react';
import { TagsProps } from './Tags.types';
import styles from './Tags.module.scss';

const Tags = (props: TagsProps): JSX.Element => {
  const { children, theme = '', contentVariation } = props;
  return (
    <div
      className={[
        styles.tags,
        styles[theme],
        contentVariation && styles[contentVariation],
      ].join(' ')}
    >
      {children}
    </div>
  );
};

export default Tags;
