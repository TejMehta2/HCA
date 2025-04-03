import React from 'react';
import { CareersImageHeaderProps } from './CareersImageHeader.types';
import styles from './CareersImageHeader.module.scss';

const CareersImageHeader = (props: CareersImageHeaderProps): JSX.Element => {
  const { subtitle, title, bodyCopy, cta, image } = props;
  return (
    <div className={styles.wrapper}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.container}>
        <div className={styles.content}>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          <div className={styles.title}>{title}</div>
          {bodyCopy && <div className={styles['body-copy']}>{bodyCopy}</div>}
          {cta && <div className={styles.cta}>{cta}</div>}
        </div>
      </div>
    </div>
  );
};

export default CareersImageHeader;
