import React from 'react';
import { HeaderPlainProps } from './HeaderPlain.types';
import styles from './HeaderPlain.module.scss';

const HeaderPlain = (props: HeaderPlainProps): JSX.Element => {
  const {
    heading,
    subheading,
    description,
    children,
    contentVariation,
    subtitle,
  } = props;

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.inner} ${
          contentVariation ? styles[contentVariation] : ''
        } `}
      >
        <div className={styles.grid}>
          <div className={styles.half}>
            {subheading && (
              <div className={styles.subheading}>{subheading}</div>
            )}
            <div className={styles.heading}>{heading}</div>
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
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
