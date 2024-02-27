import React from 'react';
import { FormProgressBarProps } from './FormProgressBar.types';
import styles from './FormProgressBar.module.scss';

const FormProgressBar = (props: FormProgressBarProps): JSX.Element => {
  const { pages } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.pages}>
          {pages.map((page, index) => (
            <div
              key={index}
              className={`${styles.page} ${page.stage && styles[page.stage]}`}
            >
              {page.pageControl}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormProgressBar;
