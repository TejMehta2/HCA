import React, { type JSX } from 'react';
import { ThemesProps } from './Themes.types';
import styles from './Themes.module.scss';
import { generateHtmlSafeId } from '../../utility-functions/index';

const themeModes: Record<string, 'dark' | 'light'> = {
  'A-HCA-White': 'dark',
  'B-HCA-Navy-Blue': 'light',
  'C-HCA-Denim': 'light',
  'D-HCA-Teal': 'dark',
  'E-HCA-Cerulean': 'dark',
  'F-HCA-Fern': 'dark',
  'G-HCA-Orange': 'dark',
  'H-HCA-Tangerine': 'dark',
  'I-HCA-Goldenrod': 'dark',
  'J-HCA-Tangerine-20': 'dark',
  'K-HCA-Fern-20': 'dark',
  'L-HCA-Teal-5': 'dark',
  'M-HCA-Goldenrod-20': 'dark',
  'N-HCA-Denim-5': 'dark',
  'O-HCA-Teal-20': 'dark',
  'Palace-White': 'dark',
  'Palace-Grey': 'light',
  'Palace-Beige': 'dark',
  'Palace-Red': 'light',
  'Chelsea-White': 'dark',
  'Chelsea-Navy-Blue': 'light',
  'Chelsea-Beige': 'dark',
  'Chelsea-Gold': 'dark',
  LBI: 'dark',
  'LBI-Dark': 'dark',
  'LBI-White': 'light',
  'Alan-Black': 'light',
  'Alan-White': 'dark',
  'Alan-Light-Grey': 'dark',
};

const Themes = (props: ThemesProps): JSX.Element => {
  const {
    children,
    theme = 'D-HCA-Teal',
    tag = 'div',
    topLevelTheme,
    id,
    collapse = true,
    tableOfContentTitle,
  } = props;
  const CustomTag = tag as React.ElementType;

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
      data-theme-mode={themeModes[theme]}
      {...(tableOfContentTitle
        ? { 'data-subnav-link-title': linkTableOfContentTitle }
        : {})}
      {...(tableOfContentTitle
        ? { 'data-subnav-link-id': linkTableOfContentId }
        : {})}
    >
      {children}
    </CustomTag>
  );
};

export default Themes;
