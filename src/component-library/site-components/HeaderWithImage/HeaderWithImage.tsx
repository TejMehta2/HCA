import React from 'react';
import { HeaderWithImageProps } from './HeaderWithImage.types';
import styles from './HeaderWithImage.module.scss';
import Themes from '../../foundation/Themes/Themes';

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
  } = props;
  return (
    <Themes theme={theme}>
      <div className={styles['hero-with-image']}>
        <div className={styles.inner}>
          <div className={styles.content}>
            {subtitlePlacement === 'before' && subtitle && (
              <div className={styles.subtitle}>{subtitle}</div>
            )}
            <div className={styles.title}>{title}</div>
            {subtitlePlacement === 'after' && subtitle && (
              <div className={styles.subtitle}>{subtitle}</div>
            )}
            <div className={styles.copy}>{copy}</div>
            <div className={styles.ctas}>{ctas}</div>
          </div>
          <div className={styles.image}>{image}</div>
          {ratings && <div className={styles.ratings}>{ratings}</div>}
        </div>
      </div>
    </Themes>
  );
};

export default HeaderWithImage;
