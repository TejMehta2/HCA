import React from 'react';
import Loader from '../../foundation/Loader/Loader';
import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button = (props: ButtonProps): JSX.Element => {
  const { size, theme, children, loading, onClick } = props;

  const lightLoaderThemes = ['outline-dark', 'full-light-blue'];

  let loaderTheme;
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
      onClick={onClick}
      aria-live="polite"
    >
      {loading ? <Loader theme={loaderTheme}></Loader> : ''}
      {children}
    </div>
  );
};

export default Button;
