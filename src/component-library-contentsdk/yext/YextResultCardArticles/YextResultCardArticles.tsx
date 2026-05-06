import React, { type JSX } from 'react';
import { YextResultCardArticlesProps } from './YextResultCardArticles.types';
import styles from './YextResultCardArticles.module.scss';
import Button from '../../core-components/Button/Button';

const YextResultCardArticles = (
  props: YextResultCardArticlesProps
): JSX.Element => {
  const { image, title, copy, ctas } = props;

  return (
    <div
      className={[
        styles.wrapper,
        styles[image ? 'has-image' : 'no-image'],
      ].join(' ')}
    >
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.text}>
        {title && title}
        {copy && <div className={styles.copy}>{copy}</div>}
      </div>
      {ctas && (
        <div className={styles.ctas}>
          {ctas.button && (
            <Button variation="full" size="small" contentVariation="card">
              {ctas.button}
            </Button>
          )}
          {ctas.textButton && (
            <Button variation="outline" size="small">
              {ctas.textButton}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default YextResultCardArticles;
