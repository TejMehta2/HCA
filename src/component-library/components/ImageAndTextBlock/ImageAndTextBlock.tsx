import React from 'react';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';
import styles from './ImageAndTextBlock.module.scss';

const ImageAndTextBlock = (props: ImageAndTextBlockProps): JSX.Element => {
  const { children, image } = props;
  return (
    <div className={styles['block-wrapper']}>
      <div className={styles['block-container']}>
        <div className={styles['block-image']}>{image}</div>
        <div className={styles['block-content']}>{children}</div>
      </div>
    </div>
  );
};

export default ImageAndTextBlock;
