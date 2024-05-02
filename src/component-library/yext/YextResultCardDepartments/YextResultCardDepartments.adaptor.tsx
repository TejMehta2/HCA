import React from 'react';
import Text from '../../foundation/Text/Text';
import YextResultCardArticles from '../YextResultCardArticles/YextResultCardArticles';
import { CardProps } from '@yext/search-ui-react';
import { Ce_patientStory } from '../../types/yext/articles';

const YextResultCardDepartmentsAdaptor = (
  props: CardProps<Ce_patientStory>
): JSX.Element => {
  const { result } = props;
  const { name, rawData } = result;
  const { c_body, landingPageUrl } = rawData;

  return (
    <YextResultCardArticles
      image={undefined}
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
        button: <a href={landingPageUrl}>Read more</a>,
      }}
    />
  );
};

export default YextResultCardDepartmentsAdaptor;
