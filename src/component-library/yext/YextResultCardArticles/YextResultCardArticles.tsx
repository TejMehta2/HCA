import React from 'react';
import { YextResultCardArticlesProps } from './YextResultCardArticles.types';
import styles from './YextResultCardArticles.module.scss';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

const YextResultCardArticles = (
  props: YextResultCardArticlesProps
): JSX.Element => {
  const { image, title, copy, ctas } = props;
  return (
    <div className={styles.wrapper}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.text}>
        {title && title}
        {copy && copy}
      </div>
      {ctas && (
        <div className={styles.ctas}>
          {ctas.button && (
            <Button variation="full" size="large" contentVariation="card">
              {ctas.button}
            </Button>
          )}
          {ctas.textButton && <TextButton>{ctas.textButton}</TextButton>}
        </div>
      )}
    </div>
  );
};

export default YextResultCardArticles;
