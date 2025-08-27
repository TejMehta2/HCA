import React from 'react';
import { TextBlockProps } from './TextBlock.types';
import styles from './TextBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const TextBlock = (props: TextBlockProps): JSX.Element => {
  const {
    theme = 'A-HCA-White',
    subheading,
    title,
    text,
    ctas,
    contentVariation,
    tableOfContentTitle,
    id,
  } = props;
  return (
    <Themes id={id} theme={theme} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div
            className={[
              styles.content,
              contentVariation === 'centered' ? styles.centered : '',
            ].join(' ')}
          >
            {subheading && (
              <div className={styles.subheading}>{subheading}</div>
            )}
            {title && <div className={styles.title}>{title}</div>}
            {text && <div className={styles.text}>{text}</div>}
            {ctas && (
              <Themes theme={theme}>
                <div className={styles.ctas}>{ctas}</div>
              </Themes>
            )}
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default TextBlock;
