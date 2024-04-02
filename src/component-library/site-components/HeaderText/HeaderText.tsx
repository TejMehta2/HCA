import React from 'react';
import { HeaderTextProps } from './HeaderText.types';
import styles from './HeaderText.module.scss';

const HeaderText = (props: HeaderTextProps): JSX.Element => {
  const { subtitle, title, description, cta } = props;
  return (
    <div className={styles.background}>
      <div className={styles.grid}>
        <div className={styles.inner}>
          <div className={styles.subtitle}>{subtitle}</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.cta}>{cta}</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderText;
