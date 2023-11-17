import React from 'react';
import { ThemesProps } from './Themes.types';
import styles from './Themes.module.scss';

const Themes = (props: ThemesProps): JSX.Element => {
  const { children, theme = 'a', tag = 'div' } = props;
  const CustomTag = tag as keyof JSX.IntrinsicElements;
  return <CustomTag className={styles[theme]}>{children}</CustomTag>;
};

export default Themes;
