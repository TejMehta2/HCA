import React from 'react';
import Text from '../../foundation/Text/Text';
import YextResultCardArticles from '../YextResultCardArticles/YextResultCardArticles';
import { CardProps } from '@yext/search-ui-react';
import { Ce_patientStory } from '../../types/yext/articles';
import Icons from '../../foundation/Icons/Icons';

const YextResultCardDepartmentsAdaptor = (
  props: CardProps<Ce_patientStory>
): JSX.Element => {
  const { result } = props;
  const { name, rawData } = result;
  const { c_body, landingPageUrl, c_answersPrimaryCallToAction } = rawData;

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
        button: landingPageUrl ? (
          <a href={landingPageUrl}>
            Learn <b>more</b>
          </a>
        ) : undefined,
        textButton: c_answersPrimaryCallToAction?.link ? (
          <a href={c_answersPrimaryCallToAction?.link}>
            <Icons iconName={'iconStethoscope'} />
            <span>
              Find a <b>consultant</b>
            </span>
          </a>
        ) : undefined,
      }}
    />
  );
};

export default YextResultCardDepartmentsAdaptor;
