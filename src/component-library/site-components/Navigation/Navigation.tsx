import React from 'react';
import { NavigationProps } from './Navigation.types';
import styles from './Navigation.module.scss';
import NavigationDesktop from '../../components/NavigationDesktop/NavigationDesktop';
import NavigationMobile from '../../components/NavigationMobile/NavigationMobile';
import { useScrollDirection } from '../../hooks/useScrollDirection';

const Navigation = (props: NavigationProps): JSX.Element => {
  // Hooks
  const scrollDirection = useScrollDirection();
  return (
    <div className={[styles.sticky, styles[scrollDirection]].join(' ')}>
      <NavigationDesktop {...props} />
      <NavigationMobile {...props} />
    </div>
  );
};

export default Navigation;
