import React from 'react';
import Themes from '../../foundation/Themes/Themes';
import { ImageAndTextBlockProps } from './ImageAndTextBlock.types';
import styles from './ImageAndTextBlock.module.scss';

const ImageAndTextBlock = (props: ImageAndTextBlockProps): JSX.Element => {
  const {
    children,
    image,
    header,
    subheader,
    ctas,
    imageAlignment = 'left',
    imageVerticalAlignment = 'top',
    imageWidth = 'standard',
    imageNoStretch,
    imageKeepAspectRatio = false,
    length = 'short',
    theme,
    ratings,
    iconList,
    hideImageOnMobile,
    cfVariation,
    contentVariation,
    noOverflownHidden,
    id,
    tableOfContentTitle,
  } = props;

  return (
    <Themes id={id} theme={theme} tableOfContentTitle={tableOfContentTitle}>
      <div className={noOverflownHidden ? '' : styles.background}>
        <div
          className={[
            styles['wrapper'],
            iconList ? styles['icon-list-wrapper'] : '',
            contentVariation ? styles[contentVariation] : '',
          ].join(' ')}
        >
          <div
            className={[
              styles['container'],
              styles[length],
              styles[`image-${imageAlignment}`],
              styles[`image-${imageVerticalAlignment}`],
              styles[`image-${imageWidth}`],
            ].join(' ')}
          >
            <div
              className={[
                styles['image'],
                cfVariation ? styles['hide-on-mobile-cf'] : '',
                hideImageOnMobile ? styles['hide-on-mobile'] : '',
                imageKeepAspectRatio ? styles['keep-aspect-ratio'] : '',
                imageNoStretch ? styles['image-no-stretch'] : '',
              ].join(' ')}
              data-animate="s"
            >
              {image}
            </div>
            <div
              className={[
                styles['content'],
                cfVariation ? styles['content-cf'] : '',
              ].join(' ')}
              data-animate="l"
            >
              {subheader && (
                <div className={styles['subheader']}>{subheader}</div>
              )}
              <div className={styles['header']}>{header}</div>
              {children && <div className={styles.children}>{children}</div>}

              {ctas && (
                <Themes theme={theme}>
                  <div className={styles['ctas']}>{ctas}</div>
                </Themes>
              )}

              {ratings && <div className={styles.ratings}>{ratings}</div>}
              {iconList && (
                <ul className={styles['icon-list']}>
                  {iconList.map((item, index) => (
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
