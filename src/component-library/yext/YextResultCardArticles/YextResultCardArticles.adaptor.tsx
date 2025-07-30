import React from 'react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import YextResultCardArticles from './YextResultCardArticles';
import { CardProps } from '@yext/search-ui-react';
import { Ce_patientStory } from '../../types/yext/articles';
import Icons from '../../foundation/Icons/Icons';

const YextResultCardArticlesAdaptor = (
  props: CardProps<Ce_patientStory>
): JSX.Element => {
  const { result } = props;
  const {
    // description,
    // distance,
    // distanceFromFilter,
    // entityType,
    // highlightedFields,
    // id,
    // index,
    // link,
    // name,
    rawData,
  } = result;
  const {
    // c_activeInSearch,
    c_answersPrimaryCallToAction,
    c_body,
    c_nameRichText,
    c_primaryImage,
    c_servicesImage,
    // id: rawData_id,
    // landingPageUrl,
    c_uRL,
    name,
    // type,
    // uid,
    c_abstractTitle,
    c_abstractText,
    c_pageTitle,
    c_pageText,
  } = rawData;

  const resultTitle =
    c_nameRichText || c_abstractTitle || c_pageTitle || name || '';

  const resultDescription = c_abstractText || c_pageText;

  const image = c_servicesImage || c_primaryImage;

  const displayImage =
    name && image?.url
      ? {
          alt: name,
          src: image?.url,
          width: image?.width,
          height: image?.height,
        }
      : undefined;

  return (
    <YextResultCardArticles
      image={
        displayImage ? (
          <>
            <Image {...displayImage} />
          </>
        ) : undefined
      }
      title={
        <Text tag="h3" variation={'heading-1'}>
          {resultTitle}
        </Text>
      }
      copy={
        c_body ? (
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

export default YextResultCardArticlesAdaptor;
