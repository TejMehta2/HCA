import React from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types';
import styles from './Breadcrumbs.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Link from 'next/link';

const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
  const { children } = props;

  const firstBreadcrumbLink = children && children[0]?.props?.href;
  const firstBreadcrumbText = children && children[0]?.props?.children;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles['breadcrumbs-list']}>
          <Link href="/">
            <Icons iconName="iconHome"></Icons>
          </Link>
          {children}
        </span>

        {firstBreadcrumbLink && (
          <Link
            href={firstBreadcrumbLink}
            className={styles['breadcrumb-back']}
          >
            <Icons iconName="iconArrowLeft"></Icons>
            <div>
              <span>Back to</span> {firstBreadcrumbText}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Breadcrumbs;
