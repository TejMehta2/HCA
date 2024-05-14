import React from 'react';
import { BlogContentProps } from './BlogContent.types';
import styles from './BlogContent.module.scss';
import Themes from '../../foundation/Themes/Themes';

const BlogContent = (props: BlogContentProps): JSX.Element => {
  const {
    theme,
    children,
    imageKeepAspectRatio = false,
    contentVariation,
  } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div
          className={`${styles.container} ${
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
