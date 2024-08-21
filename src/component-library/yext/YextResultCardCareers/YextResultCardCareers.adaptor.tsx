import React from 'react';
import Text from '../../foundation/Text/Text';
import YextResultCardCareers from './YextResultCardCareers';
// import { CardProps } from '@yext/search-ui-react';
import Button from '../../core-components/Button/Button';

const YextResultCardCareersAdaptor = () // props: CardProps<unknown>
: JSX.Element => {
  // const { result } = props;
  // const { rawData } = result;
  // const {} = rawData;
  const location = 'Head office - London';
  const clinical = 'Clinical';
  const timing = 'Full time';
  const title = (
    <Text variation={'heading-1'}>EHR Registration Scheduling Change Lead</Text>
  );
  const cta = (
    <Button contentVariation={'full-width'} variation={'full'} size={'small'}>
      <a href="#">Read More & Apply</a>
    </Button>
  );
  return (
    <YextResultCardCareers
      location={location}
      clinical={clinical}
      timing={timing}
      title={title}
      cta={cta}
    />
  );
};

export default YextResultCardCareersAdaptor;
