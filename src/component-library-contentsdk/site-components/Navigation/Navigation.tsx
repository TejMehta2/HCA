import { Suspense, type JSX } from 'react';
import { NavigationProps } from './Navigation.types';
import NavigationDesktop from '../../components/NavigationDesktop/NavigationDesktop';
import NavigationMobile from '../../components/NavigationMobile/NavigationMobile';
import NavigationStickyClient from './NavigationStickyClient';

const Navigation = (props: NavigationProps): JSX.Element => {
  return (
    <NavigationStickyClient>
      <Suspense fallback={null}>
        <NavigationDesktop {...props} />
      </Suspense>
      <Suspense fallback={null}>
        <NavigationMobile {...props} />
      </Suspense>
    </NavigationStickyClient>
  );
};

export default Navigation;
