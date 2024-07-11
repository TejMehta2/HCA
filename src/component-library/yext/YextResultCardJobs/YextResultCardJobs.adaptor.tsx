import React from 'react';
import Text from '../../foundation/Text/Text';
import YextResultCardArticles from '../YextResultCardArticles/YextResultCardArticles';
import { CardProps } from '@yext/search-ui-react';
import Job from '../../types/yext/jobs';

const YextResultCardJobsAdaptor = (props: CardProps<Job>): JSX.Element => {
  const { result } = props;

  const { name, rawData } = result;
  const { c_body, landingPageUrl } = rawData;

  return (
    <YextResultCardArticles
      title={
        <Text tag="h3" variation={'heading-1'}>
          {name}
        </Text>
      }
      copy={
        c_body ? (
          <Text tag="div" variation={'body-large'}>
            <span dangerouslySetInnerHTML={{ __html: c_body }} />
          </Text>
        ) : undefined
      }
      ctas={{
        button: (
          <a href={landingPageUrl}>
            Learn <b>more</b>
          </a>
        ),
      }}
    />
  );
};

export default YextResultCardJobsAdaptor;
