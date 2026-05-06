import React from 'react';
import { CTABlockProps } from './CTABlock.types';
import styles from './CTABlock.module.scss';
import Themes from '../../foundation/Themes/Themes';

const CTABlock = (props: CTABlockProps): JSX.Element => {
  const { header, subheader, children, ctas, theme, id, tableOfContentTitle } = props;
  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <div className={styles['wrapper']}>
        <div className={styles['container']}>
          <div className={styles['text-column']}>
            <div>{subheader}</div>
            <div className={styles['header']}>{header}</div>
            <div className={styles['body-text']}>{children}</div>
          </div>
          {ctas && <div className={styles['ctas']}>{ctas}</div>}
        </div>
      </div>
    </Themes>
  );
};

export default CTABlock;
