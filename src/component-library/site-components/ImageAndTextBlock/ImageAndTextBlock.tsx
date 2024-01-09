import React from 'react';
import Themes from '../../foundation/Themes/Themes';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
import useWindowWidth from '../../hooks/useWindowWidth';
import styles from './ImageAndTextBlock.module.scss';

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
    ratings,
    itemsList,
  } = props;

  const isXl = useWindowWidth(1440);

  return (
    <Themes theme={theme}>
      <div className={styles.background}>
        <div
          className={[
            styles['wrapper'],
            itemsList ? styles['items-list-wrapper'] : '',
          ].join(' ')}
        >
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

              {ratings && <div className={styles.ratings}>{ratings}</div>}
              {itemsList && (
                <ul className={styles['items-list']}>
                  {itemsList.map((item, index) => (
                    <li key={index}>
                      {item.icon}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default ImageAndTextBlock;
