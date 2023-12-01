import React from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types';
import styles from './Breadcrumbs.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Link from 'next/link';
import useWindowWidth from '../../hooks/useWindowWidth';

const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
  const isM = useWindowWidth(1135);

  const { children } = props;

  const firstBreadcrumbLink = children && children[0].props.href;
  const firstBreadcrumbText = children && children[0].props.children;

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
        <Link href={firstBreadcrumbLink}>
          <Icons iconName="iconArrowLeft"></Icons>
          <div>
            <span>Back to</span> {firstBreadcrumbText}
          </div>
        </Link>
      )}
    </div>
  );
};

export default Breadcrumbs;
