import React from 'react';
import { BlogContentProps } from './BlogContent.types';
import styles from './BlogContent.module.scss';
import Themes from '../../foundation/Themes/Themes';
import { useColumnSplitterContext } from '../../context/columnSplitterContext';

const BlogContent = (props: BlogContentProps): JSX.Element => {
  const {
    theme,
    children,
    imageKeepAspectRatio = false,
    contentVariation,
    id,
    tableOfContentTitle,
  } = props;

  const columnContext = useColumnSplitterContext();
  const hasMultipleColumns = columnContext?.hasMultipleColumns ?? false;

  return (
    <Themes theme={theme} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper} id={id}>
        <div
          className={`${hasMultipleColumns ? '' : styles.container} ${
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
