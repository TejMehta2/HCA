import React, { type JSX } from 'react';
import { CardBlogBlockProps } from './CardBlogBlock.types';
import styles from './CardBlogBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const CardBlogBlock = (props: CardBlogBlockProps): JSX.Element => {
  const { title, children, theme = 'K-HCA-Fern-20', cta, id, tableOfContentTitle } = props;
  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.grid}>{children}</div>
          {cta && (
            <Themes theme={theme}>
              <div className={styles.cta}>{cta}</div>
            </Themes>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default CardBlogBlock;
