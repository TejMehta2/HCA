import React from 'react';
import Text from '../../foundation/Text/Text';
import YextResultCardCareers from './YextResultCardCareers';
// import { CardProps } from '@yext/search-ui-react';
import Button from '../../core-components/Button/Button';
import Job from '../../types/yext/jobs';
import { CardProps } from '@yext/search-ui-react';

const YextResultCardCareersAdaptor = (props: CardProps<Job>): JSX.Element => {
  const { result } = props;
  const { rawData } = result;
  const {
    landingPageUrl,
    c_jobLocation,
    c_employmentType,
    name,
    c_jobFunction,
  } = rawData;
  const title = <Text variation={'heading-1'}>{name}</Text>;
  const cta = (
    <Button contentVariation={'full-width'} variation={'full'} size={'small'}>
      <a href={landingPageUrl}>
        <span>
          <span>Read More & </span>
          <strong>Apply</strong>
        </span>
      </a>
    </Button>
  );
  return (
    <YextResultCardCareers
      location={c_jobLocation}
      clinical={c_jobFunction}
      timing={c_employmentType}
      title={title}
      cta={cta}
    />
  );
};

export default YextResultCardCareersAdaptor;
