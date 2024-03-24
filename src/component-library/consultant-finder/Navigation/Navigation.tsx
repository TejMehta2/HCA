import React from 'react';
import styles from './Navigation.module.scss';
import NavigationProps from './Navigation.types';

const Navigation = (props: NavigationProps): JSX.Element => {
  const { showOnMobile, hasCustomBtnMobile } = props;
  const classNames = [styles['consultant-finder-navigation']];

  // Conditionally add the class if showOnMobile is true
  if (showOnMobile) {
    classNames.push(styles['show-on-mobile']);
  }

  // add custom button style to fit on sm when needed
  if (hasCustomBtnMobile) {
    classNames.push(styles['custom-btns-sm']);
  }

  return <div className={classNames.join(' ')}>{props.children}</div>;
};

export default Navigation;
