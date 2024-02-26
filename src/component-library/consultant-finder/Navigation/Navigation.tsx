import React from 'react';
import styles from './Navigation.module.scss';
import NavigationProps from './Navigation.types';

const Navigation = (props: NavigationProps): JSX.Element => {
  const { showOnMobile } = props;
  const classNames = [styles['consultant-finder-navigation']];

  // Conditionally add the class if showOnMobile is true
  if (showOnMobile) {
    classNames.push(styles['show-on-mobile']);
  }

  return <div className={classNames.join(' ')}>{props.children}</div>;
};

export default Navigation;
