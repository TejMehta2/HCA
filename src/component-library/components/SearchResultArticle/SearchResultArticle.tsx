import React from 'react';
import { SearchResultArticleProps } from './SearchResultArticle.types';
import styles from './SearchResultArticle.module.scss';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

const SearchResultArticle = (props: SearchResultArticleProps): JSX.Element => {
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
          {ctas.link && (
            <Button variation="full" size="large" contentVariation="card">
              {ctas.link}
            </Button>
          )}
          {ctas.email && <TextButton>{ctas.email}</TextButton>}
        </div>
      )}
    </div>
  );
};

export default SearchResultArticle;
