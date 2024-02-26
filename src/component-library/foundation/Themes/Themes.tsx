import React from 'react';
import { ThemesProps } from './Themes.types';
import styles from './Themes.module.scss';

const Themes = (props: ThemesProps): JSX.Element => {
  const {
    children,
    theme = 'A-HCA-Main-Turquoise',
    tag = 'div',
    topLevelTheme,
  } = props;
  const CustomTag = tag as keyof JSX.IntrinsicElements;
  return (
    <CustomTag
      className={[styles[theme], styles[`master-${topLevelTheme}`]].join(' ')}
      data-theme={theme}
      data-theme-mode={styles?.[`mode-${theme}`]}
    >
      {children}
    </CustomTag>
  );
};

export default Themes;
