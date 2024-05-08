import React from 'react';
import { TextBlockProps } from './TextBlock.types';
import styles from './TextBlock.module.scss';

const TextBlock = (props: TextBlockProps): JSX.Element => {
  const { subheading, title, text, ctas } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.content}>
          {subheading && <div className={styles.subheading}>{subheading}</div>}
          {title && <div className={styles.title}>{title}</div>}
          {text && <div className={styles.text}>{text}</div>}
          {ctas && <div className={styles.ctas}>{ctas}</div>}
        </div>
      </div>
    </div>
  );
};

export default TextBlock;
