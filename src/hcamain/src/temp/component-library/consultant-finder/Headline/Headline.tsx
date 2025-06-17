import React from 'react';
import { HeadlineProps } from './Headline.types';
import styles from './Headline.module.scss';

const Headline = (props: HeadlineProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.headline}>{children}</div>;
};

export default Headline;
