import React from 'react';
import { HeaderWithImageProps } from './HeaderWithImage.types';
import styles from './HeaderWithImage.module.scss';
import Themes from '../../foundation/Themes/Themes';

export const getDynamicTitleStyle = (length?: number) => {
  if (!length) return 'display-1';
  if (length >= 50) {
    return 'display-6';
  } else if (length >= 40) {
    return 'display-5';
  } else if (length >= 30) {
    return 'display-4';
  } else if (length >= 20) {
    return 'display-3';
  } else if (length >= 10) {
    return 'display-2';
  } else return 'display-1';
};

const HeaderWithImage = (props: HeaderWithImageProps): JSX.Element => {
  const {
    title,
    copy,
    ctas,
    theme = 'D-HCA-Teal',
    image,
    subtitle,
    subtitlePlacement = 'after',
    ratings,
    noMask = false,
    contentVariation,
    textWidth,
  } = props;
  return (
    <div data-content="header-with-image">
      <Themes theme={theme}>
        <div
          className={[
            styles['hero-with-image'],
            contentVariation === 'fullWidthImage' && styles['full-width-image'],
          ].join(' ')}
        >
          <div className={styles.inner}>
            <div
              className={[
                styles.content,
                textWidth === 'wide' && styles['wide-text'],
              ].join(' ')}
            >
              {subtitlePlacement === 'before' && subtitle && (
                <div className={styles.subtitle}>{subtitle}</div>
              )}
              <div className={styles.title}>{title}</div>
              {subtitlePlacement === 'after' && subtitle && (
                <div className={styles.subtitle}>{subtitle}</div>
              )}
              <div className={styles.copy}>{copy}</div>
              <Themes theme={theme}>
                <div className={styles.ctas}>{ctas}</div>
              </Themes>
            </div>
            <div className={noMask ? styles['image-no-mask'] : styles.image}>
              {image}
            </div>
            {ratings && <div className={styles.ratings}>{ratings}</div>}
          </div>
        </div>
      </Themes>
    </div>
  );
};

export default HeaderWithImage;
