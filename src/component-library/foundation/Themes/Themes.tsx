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
    collapse = true,
  } = props;
  const CustomTag = tag as keyof JSX.IntrinsicElements;
  return (
    <CustomTag
      id={id}
      className={[
        styles.wrapper,
        styles[theme],
        styles[`master-${topLevelTheme}`],
        collapse ? styles.collapse : styles['no-collapse'],
      ].join(' ')}
      data-theme={theme}
      data-theme-mode={styles?.[`mode-${theme}`]}
      data-subnav-title-test="test"
    >
      {children}
    </CustomTag>
  );
};

export default Themes;
