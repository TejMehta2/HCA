import React from 'react';
import { MasonryCardProps, MasonryCardsProps } from './MasonryCards.types';
import styles from './MasonryCards.module.scss';

export const MasonryCard = (props: MasonryCardProps): JSX.Element => {
  const { title, copy, cta, image, rows, columns } = props;
  return (
    <div
      style={{ ['--rows' as string]: rows, ['--columns' as string]: columns }}
      className={styles.card}
    >
      <div className={styles.image}>{image}</div>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {copy && <div className={styles.copy}>{copy}</div>}
        {cta && <div className={styles.cta}>{cta}</div>}
      </div>
    </div>
  );
};

const MasonryCards = (props: MasonryCardsProps): JSX.Element => {
  const { subtitle, title, children } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {title && <div className={styles.title}>{title}</div>}
        {children && <div className={styles.children}>{children}</div>}
      </div>
    </div>
  );
};

export default MasonryCards;
