import React from 'react';
import Loader from '../../foundation/Loader/Loader';
import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';
import { LoaderThemeUnionTypes } from '../../foundation/Loader/Loader.types';

const Button = (props: ButtonProps): JSX.Element => {
  const { size = 'large', theme = 'full-dark', children, loading } = props;

  const lightLoaderThemes = ['outline-dark', 'full-light-blue'];

  let loaderTheme: LoaderThemeUnionTypes;
  if (lightLoaderThemes.includes(theme)) {
    loaderTheme = 'light';
  } else {
    loaderTheme = 'dark';
  }

  return (
    <div
      className={[
        styles.button,
        styles[size],
        styles[theme],
        styles[loading ? 'loading' : ''],
      ].join(' ')}
      aria-live="polite"
    >
      {loading ? <Loader theme={loaderTheme}></Loader> : ''}
      {children}
    </div>
  );
};

export default Button;
