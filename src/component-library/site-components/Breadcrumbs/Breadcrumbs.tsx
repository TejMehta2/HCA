import React from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types';
import styles from './Breadcrumbs.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Link from 'next/link';

const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
  const { backCta, children } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles['breadcrumbs-list']}>{children}</span>
        {backCta?.link && (
          <Link href={backCta.link || ''} className={styles['breadcrumb-back']}>
            <Icons iconName="iconArrowLeft"></Icons>
            <div>
              <span>Back to</span> {backCta.text}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Breadcrumbs;
