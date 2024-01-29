import React from 'react';
import { HeaderPlainProps } from './HeaderPlain.types';
import styles from './HeaderPlain.module.scss';
import Themes from '../../foundation/Themes/Themes';

const HeaderPlain = (props: HeaderPlainProps): JSX.Element => {
  const {
    heading,
    subheading,
    children,
    search,
    theme = 'A-HCA-Main-Turquoise',
  } = props;

  return (
    <Themes theme={theme}>
      <div className={styles.grid}>
        <div className={styles.subheading}>{subheading}</div>
        <div className={styles.heading}>{heading}</div>
        <div className={styles['body-copy']}>{children}</div>
        {search && <div className={styles.search}>{search}</div>}
      </div>
    </Themes>
  );
};

export default HeaderPlain;
