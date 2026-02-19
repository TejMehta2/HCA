import React from 'react';
import { JumpToLinkProps, JumpToLinksProps } from './JumpToLinks.types';
import styles from './JumpToLinks.module.scss';
import Button from '../../core-components/Button/Button';
import { useColumnSplitterContext } from '../../context/columnSplitterContext';

export const JumpToLink = (props: JumpToLinkProps): JSX.Element => {
  const { children } = props;
  return <li className={styles.link}>{children}</li>;
};

export const JumpToAnchor = (props: JumpToLinkProps): JSX.Element => {
  const { children } = props;
  return (
    <li>
      <Button size={'small'} variation={'jump-to'}>
        {children}
      </Button>
    </li>
  );
};

const JumpToLinks = (props: JumpToLinksProps): JSX.Element => {
  const columnContext = useColumnSplitterContext();
  const hasMultipleColumns = columnContext?.hasMultipleColumns ?? false;
  const { children, heading } = props;
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles['container-all']} ${hasMultipleColumns ? '' : styles.container}`}
      >
        {heading && <div className={styles.heading}>{heading}</div>}
        {children && <ul className={styles.children}>{children}</ul>}
      </div>
    </div>
  );
};

export default JumpToLinks;
