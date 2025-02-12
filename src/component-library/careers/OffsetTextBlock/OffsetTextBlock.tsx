import React from 'react';
import { OffsetTextBlockProps } from './OffsetTextBlock.types';
import styles from './OffsetTextBlock.module.scss';

const OffsetTextBlock = (props: OffsetTextBlockProps): JSX.Element => {
  const { title, bodyCopy, cta } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles['offset-content']}>
          {bodyCopy && <div className={styles.text}>{bodyCopy}</div>}
          {cta && <div className={styles.cta}>{cta}</div>}
        </div>
      </div>
    </div>
  );
};

export default OffsetTextBlock;
