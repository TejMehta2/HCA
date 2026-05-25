'use client';
import React, { useState, useEffect, type JSX } from 'react';
import { NavigationProps } from './Navigation.types';
import styles from './Navigation.module.scss';
import NavigationDesktop from '../../components/NavigationDesktop/NavigationDesktop';
import NavigationMobile from '../../components/NavigationMobile/NavigationMobile';
import { useScrollDirection } from '../../hooks/useScrollDirection';

const Navigation = (props: NavigationProps): JSX.Element => {
  const [homeUrl, setHomeUrl] = useState('/');

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window?.location.href.indexOf(
        process.env.NEXT_PUBLIC_BASE_URL_CAREERS || 'careers'
      ) !== -1
    ) {
      setHomeUrl('/careers');
    }
  }, []);

  // Hooks
  const scrollDirection = useScrollDirection();
  return (
    <div className={[styles.sticky, styles[scrollDirection]].join(' ')}>
      <NavigationDesktop {...props} homeUrl={homeUrl} />
      <NavigationMobile {...props} homeUrl={homeUrl} />
    </div>
  );
};

export default Navigation;
