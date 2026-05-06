import React, { type JSX } from 'react';
import { HeaderPlainProps } from './HeaderPlain.types';
import styles from './HeaderPlain.module.scss';

export const getDynamicTitleStyle = (length?: number) => {
  if (!length) return 'display-1';
  if (length >= 80) {
    return 'display-6';
  } else if (length >= 70) {
    return 'display-5';
  } else if (length >= 60) {
    return 'display-4';
  } else if (length >= 50) {
    return 'display-3';
  } else if (length >= 40) {
    return 'display-2';
  } else return 'display-1';
};

const HeaderPlain = (props: HeaderPlainProps): JSX.Element => {
  const {
    heading,
    metatitle,
    description,
    children,
    contentVariation,
    subtitle,
    image,
    subtitlePlacement
  } = props;

  return (
    <div className={styles.wrapper}>
      {image && <div className={styles.image}>{image}</div>}
      <div
        className={`${styles.inner} ${contentVariation ? styles[contentVariation] : ''
          } `}
      >
        <div className={styles.grid}>
          <div className={styles.half}>
            {metatitle && <div className={styles.metatitle}>{metatitle}</div>}
            {subtitlePlacement === 'before' && subtitle && (
              <div className={styles.subtitle}>{subtitle}</div>
            )}
            <div className={styles.heading}>{heading}</div>
            {subtitlePlacement === 'after' && subtitle && (
              <div className={styles.subtitle}>{subtitle}</div>
            )}
            {description && (
              <div className={styles['body-copy']}>{description}</div>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default HeaderPlain;
