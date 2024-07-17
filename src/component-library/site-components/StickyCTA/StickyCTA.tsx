import React from 'react';
import { StickyCTAProps } from './StickyCTA.types';
import styles from './StickyCTA.module.scss';
import Themes from '../../foundation/Themes/Themes';

const StickyCTA = (props: StickyCTAProps): JSX.Element => {
  const { children, cta } = props;
  return (
    <Themes theme="B-HCA-Navy-Blue">
      <div className={styles.wrapper}>
        <div className={styles.content}>{children}</div>
        {cta && <div className={styles.cta}>{cta}</div>}
      </div>
    </Themes>
  );
};

export default StickyCTA;
