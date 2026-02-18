import React, { useEffect, useRef } from 'react';
import { JumpToLinkProps, JumpToLinksProps } from './JumpToLinks.types';
import styles from './JumpToLinks.module.scss';
import Button from '../../core-components/Button/Button';
import TextLink from '../../core-components/TextLink/TextLink';

export const JumpToLink = (props: JumpToLinkProps): JSX.Element => {
  const { children } = props;
  return <li className={styles.link}>{children}</li>;
};

export const JumpToTextLink = (props: JumpToLinkProps): JSX.Element => {
  const { children } = props;
  return (
    <li>
      <TextLink>{children}</TextLink>
    </li>
  );
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
  const { children, heading, variation, isSticky } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSticky || !rootRef.current) return;
    const themeWrapper = rootRef.current.closest(
      '[data-theme]'
    ) as HTMLElement | null;
    if (!themeWrapper) return;
    const previousHeight = themeWrapper.style.height;
    themeWrapper.style.height = '100%';
    return () => {
      themeWrapper.style.height = previousHeight;
    };
  }, [isSticky]);

  return (
    <div
      ref={rootRef}
      className={[
        styles.wrapper,
        variation && styles[variation],
        isSticky && styles.sticky,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.container}>
        {heading && <div className={styles.heading}>{heading}</div>}
        {children && <ul className={styles.children}>{children}</ul>}
      </div>
    </div>
  );
};

export default JumpToLinks;
