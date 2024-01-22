import React from 'react';
import { CardBlogBlockProps } from './CardBlogBlock.types';
import styles from './CardBlogBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const CardBlogBlock = (props: CardBlogBlockProps): JSX.Element => {
  const { title, children, theme = 'H-HCA-Green-20', cta } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.grid}>{children}</div>
          {cta && <div className={styles.cta}>{cta}</div>}
        </div>
      </div>
    </Themes>
  );
};

export default CardBlogBlock;
