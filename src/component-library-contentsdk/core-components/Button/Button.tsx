import React, { type JSX } from 'react';
import Loader from '../../foundation/Loader/Loader';
import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';
import { LoaderThemeUnionTypes } from '../../foundation/Loader/Loader.types';

const Button = (props: ButtonProps): JSX.Element => {
  const {
    size = 'large',
    variation = 'full-dark',
    children,
    loading,
    contentVariation,
  } = props;

  const lightLoaderVariations = ['outline-dark', 'full-light-blue'];

  let loaderTheme: LoaderThemeUnionTypes;
  if (lightLoaderVariations.includes(variation)) {
    loaderTheme = 'light';
  } else {
    loaderTheme = 'dark';
  }

  return (
    <div
      className={[
        styles.button,
        styles[size],
        styles[variation],
        styles[loading ? 'loading' : ''],
        contentVariation && styles[contentVariation],
      ].join(' ')}
      aria-live="polite"
    >
      {loading ? <Loader theme={loaderTheme}></Loader> : ''}
      {children}
    </div>
  );
};

export default Button;
