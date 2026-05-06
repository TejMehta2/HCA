import React, { type JSX } from 'react';
import { ArticleCategoriesProps } from './ArticleCategories.types';
import styles from './ArticleCategories.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Button from '../../core-components/Button/Button';

const ArticleCategories = (props: ArticleCategoriesProps): JSX.Element => {
  const { theme, title, categories, id, tableOfContentTitle } = props;
  return (
    <Themes theme={theme} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper} id={id}>
        <div className={styles.container}>
          {title}
          <div className={styles.categories}>
            {categories &&
              categories.map((category, index) => (
                <Button key={index} size="large" variation="outline">
                  {category}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default ArticleCategories;
