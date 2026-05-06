import React from 'react';
import Text from '../../foundation/Text/Text';
import YextResultCardArticles from '../YextResultCardArticles/YextResultCardArticles';
import { CardProps } from '@yext/search-ui-react';
import { Ce_patientStory } from '../../types/yext/articles';
import Icons from '../../foundation/Icons/Icons';
import { tidySearchDescription } from '../helpers/tidySearchDescription';

const YextResultCardDepartmentsAdaptor = (
  props: CardProps<Ce_patientStory>
): JSX.Element => {
  const { result } = props;
  const { name, rawData } = result;

  const {
    c_uRL,
    c_answersPrimaryCallToAction,
    c_abstractText,
    c_pageText,
    c_nameRichText,
    c_abstractTitle,
    c_pageTitle,
  } = rawData;

  const resultTitle =
    c_nameRichText || c_abstractTitle || c_pageTitle || name || '';

  const resultDescription = tidySearchDescription(c_abstractText || c_pageText);

  return (
    <YextResultCardArticles
      image={undefined}
      title={
        <Text tag="h3" variation={'heading-1'}>
          {resultTitle}
        </Text>
      }
      copy={
        resultDescription ? (
          <Text tag="div" variation={'body-large'}>
            <span dangerouslySetInnerHTML={{ __html: resultDescription }} />
          </Text>
        ) : undefined
      }
      ctas={{
        button: c_uRL ? (
          <a href={c_uRL}>
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
