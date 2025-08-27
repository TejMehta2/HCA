import React from 'react';
import { OurLocationsProps } from './OurLocations.types';
import Themes from '../../foundation/Themes/Themes';
import OurLocationsMobile from './OurLocationsMobile';
import OurLocationsDesktop from './OurLocationsDesktop';

const OurLocations = (props: OurLocationsProps): JSX.Element => {
  const { theme = 'O-HCA-Teal-20', id, tableOfContentTitle } = props;
  return (
    <Themes theme={theme} id={id} tableOfContentTitle={tableOfContentTitle}>
      <OurLocationsDesktop {...props} />
      <OurLocationsMobile {...props} />
    </Themes>
  );
};

export default OurLocations;
