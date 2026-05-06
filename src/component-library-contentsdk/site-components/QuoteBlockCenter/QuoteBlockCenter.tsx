import React, { type JSX } from 'react';
import { QuoteBlockCenterProps } from './QuoteBlockCenter.types';
import styles from './QuoteBlockCenter.module.scss';
import Tags from '../../core-components/Tags/Tags';

const QuoteBlockCenter = (props: QuoteBlockCenterProps): JSX.Element => {
  const { children, author, alignment = 'center' } = props;
  return (
    <div className={styles.wrapper}>
      <div className={[styles.container, styles[alignment]].join(' ')}>
        <div className={styles.inner}>
          {children}
          {author && (
            <div className={styles.author}>
              {author.image}
              <div className={styles['author-details']}>
                {author.name && (
                  <span className={styles.name}>{author.name}</span>
                )}
                {author.tag && (
                  <Tags contentVariation="quote">{author.tag}</Tags>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteBlockCenter;
