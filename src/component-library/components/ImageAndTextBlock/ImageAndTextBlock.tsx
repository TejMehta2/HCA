import React, { useState, useEffect } from 'react';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';
import styles from './ImageAndTextBlock.module.scss';

const useWindowWidth = (size: number) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setWidth]);

  return width >= size;
};

const ImageAndTextBlock = (props: ImageAndTextBlockProps): JSX.Element => {
  const {
    children,
    image,
    header,
    subheader,
    ctas,
    imageAlignment = 'left',
    length = 'short',
  } = props;

  const isXl = useWindowWidth(1440);

  return (
    <div className={styles['wrapper']}>
      <div
        className={[
          styles['container'],
          styles[`image-${imageAlignment}`],
        ].join(' ')}
      >
        <div className={[styles['image'], styles[length]].join(' ')}>
          {image}
        </div>
        <div className={styles['content']}>
          {subheader && <div className={styles['subheader']}>{subheader}</div>}
          <div className={styles['header']}>{header}</div>
          <div>{children}</div>

          {ctas && (
            <div className={styles['ctas']}>
              {ctas?.button1}
              {ctas.button2 && (isXl ? ctas.button2.text : ctas.button2.button)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAndTextBlock;
