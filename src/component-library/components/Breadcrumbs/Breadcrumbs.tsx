import React from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types';
import styles from './Breadcrumbs.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Link from 'next/link';
import useWindowWidth from '../../hooks/useWindowWidth';

const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
  const isM = useWindowWidth(600);

  const { children } = props;

  const firstBreadcrumbLink = children[0].props.href;
  const firstBreadcrumbText = children[0].props.children;

  return (
    <div className={styles.wrapper}>
      {isM ? (
        <>
          <Link href="/">
            <Icons iconName="iconHome"></Icons>
          </Link>
          {children}
        </>
      ) : (
        <div>
          <Icons iconName="iconArrowLeft"></Icons>
          <Link href={firstBreadcrumbLink}>
            <span>Back to</span> {firstBreadcrumbText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs;
