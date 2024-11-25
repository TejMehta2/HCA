import React from 'react';
import { AccordionsStandaloneProps } from './AccordionsStandalone.types';
import Accordions from '../../components/Accordions/Accordions';
import Themes from '../../foundation/Themes/Themes';

const AccordionsStandalone = (
  props: AccordionsStandaloneProps
): JSX.Element => {
  const { theme, accordions } = props;
  return (
    <Themes theme={theme}>
      <Accordions accordions={accordions} />
    </Themes>
  );
};

export default AccordionsStandalone;
