import React from 'react';
import { ThemesProps } from './Themes.types';
import styles from './Themes.module.scss';

const Themes = (props: ThemesProps): JSX.Element => {
  const {
    children,
    theme = 'D-HCA-Teal',
    tag = 'div',
    topLevelTheme,
    id,
  } = props;
  const CustomTag = tag as keyof JSX.IntrinsicElements;
  return (
    <CustomTag
      id={id}
      className={[
        styles.wrapper,
        styles[theme],
        styles[`master-${topLevelTheme}`],
      ].join(' ')}
      data-theme={theme}
      data-theme-mode={styles?.[`mode-${theme}`]}
    >
      {children}
    </CustomTag>
  );
};

export default Themes;
