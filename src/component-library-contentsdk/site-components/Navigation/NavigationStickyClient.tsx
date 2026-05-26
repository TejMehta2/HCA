'use client';

import React, { type JSX, type ReactNode } from 'react';
import styles from './Navigation.module.scss';
import { useScrollDirection } from '../../hooks/useScrollDirection';

type NavigationStickyClientProps = {
  children: ReactNode;
};

const NavigationStickyClient = ({
  children,
}: NavigationStickyClientProps): JSX.Element => {
  const scrollDirection = useScrollDirection();

  return (
    <div className={[styles.sticky, styles[scrollDirection]].join(' ')}>
      {children}
    </div>
  );
};

export default NavigationStickyClient;
