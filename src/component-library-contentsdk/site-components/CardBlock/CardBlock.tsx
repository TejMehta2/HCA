import React, { type JSX } from 'react';
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
    id,
    tableOfContentTitle,
  } = props;
  return (
    <Themes id={id} theme={theme} tableOfContentTitle={tableOfContentTitle}>
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
          {cta && (
            <Themes theme={theme}>
              <div className={styles.cta}>
                <Button variation="full" size="large">
                  {cta}
                </Button>
              </div>
            </Themes>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default CardBlock;
