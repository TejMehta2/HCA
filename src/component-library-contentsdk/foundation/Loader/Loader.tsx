import React, { type JSX } from 'react';
import { LoaderProps } from './Loader.types';
import styles from './_Loader.module.scss';

const Loader = (props: LoaderProps): JSX.Element => {
  const { theme = 'light' } = props;
  return (
    <span className={['loader', styles.loader, styles[theme]].join(' ')}></span>
  );
};

export default Loader;
