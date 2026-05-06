import React, { type JSX } from 'react';
import {
  IconCtaBlockChildProps,
  IconCtaBlockProps,
} from './IconCtaBlock.types';
import styles from './IconCtaBlock.module.scss';

export const IconCtaBlockChild = (
  props: IconCtaBlockChildProps
): JSX.Element => {
  const { icon, iconMobile, iconDesktop, title, copy, ctas } = props;
  return (
    <div className={styles.child}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {iconMobile && (
        <div className={[styles.icon, styles.mobile].join(' ')}>
          {iconMobile}
        </div>
      )}
      {iconDesktop && (
        <div className={[styles.icon, styles.desktop].join(' ')}>
          {iconDesktop}
        </div>
      )}
      <div className={styles.title}>{title}</div>
      <div className={styles.copy}>{copy}</div>
      <div className={styles.ctas}>{ctas}</div>
    </div>
  );
};

const IconCtaBlock = (props: IconCtaBlockProps): JSX.Element => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default IconCtaBlock;
