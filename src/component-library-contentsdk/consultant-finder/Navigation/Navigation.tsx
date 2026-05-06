import React, { type JSX } from 'react';
import styles from './Navigation.module.scss';
import NavigationProps from './Navigation.types';

const Navigation = (props: NavigationProps): JSX.Element => {
  const { showOnMobile, hasCustomBtnMobile, hideTextMobile, hideOnDesktop } = props;
  const classNames = [styles['consultant-finder-navigation']];

  // Conditionally add the class if showOnMobile is true
  if (showOnMobile) {
    classNames.push(styles['show-on-mobile']);
  }

  // Conditionally add the class if hideOnDesktop is true
  if (hideOnDesktop) {
    classNames.push(styles['hide-on-desktop']);
  }

  // hide text on mobile
  if (hideTextMobile) {
    classNames.push(styles['hide-text-on-mobile']);
  }

  // add custom button style to fit on sm when needed
  if (hasCustomBtnMobile) {
    classNames.push(styles['custom-btns-sm']);
  }

  return <div className={classNames.join(' ')}>{props.children}</div>;
};

export default Navigation;
