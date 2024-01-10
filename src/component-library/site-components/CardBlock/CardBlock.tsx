import React from 'react';
import { CardBlockProps } from './CardBlock.types';
import styles from './CardBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const CardBlock = (props: CardBlockProps): JSX.Element => {
  const {
    subtitle,
    title,
    copy,
    ctas,
    children,
    theme = 'A-HCA-Main-Turquoise',
    variation = '3-columns',
    gapSize = 'large',
  } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.block}>
        <div
          className={[
            styles.grid,
            styles[`variation-${variation}`],
            styles[gapSize],
          ].join(' ')}
        >
          <div className={styles.header}>
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            <div className={styles.title}>{title}</div>
            {copy && <div className={styles.copy}>{copy}</div>}
            {ctas && <div className={styles.ctas}>{ctas}</div>}
          </div>
          {children}
        </div>
      </div>
    </Themes>
  );
};

export default CardBlock;
