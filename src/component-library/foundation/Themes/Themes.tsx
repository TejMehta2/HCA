import React from 'react';
import { ThemesProps } from './Themes.types';
import styles from './Themes.module.scss';
import { generateHtmlSafeId } from '../../utility-functions/index';

const Themes = (props: ThemesProps): JSX.Element => {
  const {
    children,
    theme = 'D-HCA-Teal',
    tag = 'div',
    topLevelTheme,
    id,
    collapse = true,
    tableOfContentTitle
  } = props;
  const CustomTag = tag as keyof JSX.IntrinsicElements;

  let linkTableOfContentId;
  let linkTableOfContentTitle;

  if (tableOfContentTitle) {
    linkTableOfContentTitle = tableOfContentTitle;
    linkTableOfContentId = generateHtmlSafeId(tableOfContentTitle);
  }

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
      {...(tableOfContentTitle ? { 'data-subnav-link-title': linkTableOfContentTitle } : {})}
      {...(tableOfContentTitle ? { 'data-subnav-link-id': linkTableOfContentId } : {})}
    >
      {children}
    </CustomTag>
  );
};

export default Themes;
