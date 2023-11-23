import React from 'react';
import { DoctifyProps } from './Doctify.types';
import styles from './Doctify.module.scss';

const Doctify = (props: DoctifyProps): JSX.Element => {
  const { rating, reviews, logo, theme } = props;

  //const themeOveride = theme &&
  return (
    <div className={styles.bold}>
      {rating}
      {reviews}
      {logo}
    </div>
  );
};

export default Doctify;
