import React from 'react';
import { QuoteBlockProps } from './QuoteBlock.types';
import Tags from '../../core-components/Tags/Tags';
import styles from './QuoteBlock.module.scss';

const QuoteBlock = (props: QuoteBlockProps): JSX.Element => {
  const { children, author } = props;
  return (
    <div className={styles.wrapper}>
      <span className={styles.quote}>“{children}”</span>
      {author && (
        <div className={styles.author}>
          {author.image && author.image}
          <div className={styles['author-details']}>
            {author.name && <span className={styles.name}>{author.name}</span>}
            {author.tag && <Tags>{author.tag}</Tags>}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteBlock;
