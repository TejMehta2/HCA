import React from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types';
import styles from './Breadcrumbs.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Link from 'next/link';
import Themes from '../../foundation/Themes/Themes';

const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
  const { theme, backCta, children } = props;
  return (
    <Themes theme={theme || 'A-HCA-White'}>
      <div
        className={`${styles.wrapper} ${!backCta?.link ? styles['no-back-cta'] : ''}`}
        data-event="navigationClick"
        data-navigation-type="breadcrumbDesktop"
      >
        <div className={styles.container}>
          <span className={styles['breadcrumbs-list']}>{children}</span>
          {backCta?.link && (
            <Link
              href={backCta.link || ''}
              className={styles['breadcrumb-back']}
              data-navigation-type="breadcrumbMobile"
            >
              <Icons iconName="iconArrowLeft"></Icons>
              <div>
                <span>Back to</span> {backCta.text}
              </div>
            </Link>
          )}
        </div>
      </div>
    </Themes>
  );
};

export default Breadcrumbs;
