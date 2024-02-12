import React from 'react';
import { NavigationProps } from './Navigation.types';

import NavigationDesktop from '../../components/NavigationDesktop/NavigationDesktop';
import NavigationMobile from '../../components/NavigationMobile/NavigationMobile';

const Navigation = (props: NavigationProps): JSX.Element => {
  return (
    <>
      <NavigationDesktop {...props} />
      <NavigationMobile {...props} />
    </>
  );
};

export default Navigation;
