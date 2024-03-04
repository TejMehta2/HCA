import React from 'react';
import { YextResultCardArticlesProps } from './YextResultCardArticles.types';
import styles from './YextResultCardArticles.module.scss';

const YextResultCardArticles = (
  props: YextResultCardArticlesProps
): JSX.Element => {
  const { image, title, description, cta } = props;
  return (
    <div className={styles.wrapper}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
      <div className={styles.cta}>{cta}</div>
    </div>
  );
};

export default YextResultCardArticles;
