import React from 'react';
import { JumpToLinkProps, JumpToLinksProps } from './JumpToLinks.types';
import styles from './JumpToLinks.module.scss';

export const JumpToLink = (props: JumpToLinkProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.link}>{children}</div>;
};

const JumpToLinks = (props: JumpToLinksProps): JSX.Element => {
  const { children, heading } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {heading && <div className={styles.heading}>{heading}</div>}
        {children && <div className={styles.children}>{children}</div>}
      </div>
    </div>
  );
};

export default JumpToLinks;
