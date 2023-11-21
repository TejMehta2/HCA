import React, { useState, useEffect } from 'react';
import Themes from '../../foundation/Themes/Themes';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
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
    theme,
  } = props;

  const isXl = useWindowWidth(1440);

  return (
    <Themes theme={theme}>
      <div className={styles.background}>
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
              {subheader && (
                <div className={styles['subheader']}>{subheader}</div>
              )}
              <div className={styles['header']}>{header}</div>
              <div>{children}</div>

              {ctas && (
                <div className={styles['ctas']}>
                  <Button size="large" theme="full">
                    {ctas?.button1}
                  </Button>
                  {ctas.button2 &&
                    (isXl ? (
                      <TextButton>{ctas.button2}</TextButton>
                    ) : (
                      <Button size="large" theme="outline">
                        {ctas.button2}
                      </Button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default ImageAndTextBlock;
