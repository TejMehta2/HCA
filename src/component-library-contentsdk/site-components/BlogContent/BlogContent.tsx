import React, { type JSX } from 'react';
import { BlogContentProps } from './BlogContent.types';
import styles from './BlogContent.module.scss';
import Themes from '../../foundation/Themes/Themes';

const BlogContent = (props: BlogContentProps): JSX.Element => {
  const {
    theme,
    children,
    imageKeepAspectRatio = false,
    contentVariation,
    id,
    tableOfContentTitle,
    isInsideContainer = false,
  } = props;

  return (
    <Themes theme={theme} tableOfContentTitle={tableOfContentTitle}>
      <div
        className={`${isInsideContainer ? [styles.wrapper, styles['wrapper-rounded']].join(' ') : styles.wrapper}`}
        id={id}
      >
        <div
          className={`${isInsideContainer ? '' : styles.container} ${
            contentVariation ? styles[contentVariation + '-block'] : ''
          } ${imageKeepAspectRatio ? styles['keep-aspect-ratio'] : ''}`}
        >
          <div className={styles.grid}>{children}</div>
        </div>
      </div>
    </Themes>
  );
};

export default BlogContent;
