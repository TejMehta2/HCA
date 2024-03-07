import React from 'react';
import { CardBlockProps } from './CardBlock.types';
import styles from './CardBlock.module.scss';
import Themes from '../../foundation/Themes/Themes';
import Button from '../../core-components/Button/Button';

const CardBlock = (props: CardBlockProps): JSX.Element => {
  const {
    header,
    children,
    theme = 'D-HCA-Teal',
    variation = '3-columns',
    gapSize = 'large',
    cta,
  } = props;
  return (
    <Themes theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <div
            className={[
              styles.grid,
              styles[`variation-${variation}`],
              styles[gapSize],
            ].join(' ')}
          >
            <div className={styles.header}>{header}</div>
            {children}
          </div>
          <div className={styles.cta}>
            <Button variation="full" size="large">
              {cta}
            </Button>
          </div>
        </div>
      </div>
    </Themes>
  );
};

export default CardBlock;
