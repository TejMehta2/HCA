import React from 'react';
import { QuoteBlockProps } from './QuoteBlock.types';
import Tags from '../../core-components/Tags/Tags';
import styles from './QuoteBlock.module.scss';

const QuoteBlock = (props: QuoteBlockProps): JSX.Element => {
  const { children, author, title, alignment = 'left', wrapper = true } = props;
  return (
    <div
      className={[wrapper ? styles.wrapper : '', styles[alignment]].join(' ')}
    >
      {children}
      {title && <div className={styles.title}>{title}</div>}
      {author && (
        <div className={styles.author}>
          {author.image}
          <div className={styles['author-details']}>
            {author.name && <span className={styles.name}>{author.name}</span>}
            {author.tag && <Tags contentVariation="quote">{author.tag}</Tags>}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteBlock;
