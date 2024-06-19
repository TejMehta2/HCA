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
    // id: rawData_id,
    landingPageUrl,
    name,
    // type,
    // uid,
  } = rawData;

  const image =
    name && c_primaryImage?.url
      ? {
          alt: name,
          src: c_primaryImage?.url,
          width: c_primaryImage?.width,
          height: c_primaryImage?.height,
        }
      : undefined;

  return (
    <YextResultCardArticles
      image={
        image ? (
          <>
            <Image {...image} />
          </>
        ) : undefined
      }
      title={
        <Text tag="h3" variation={'heading-1'}>
          {c_nameRichText || name}
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

export default YextResultCardArticlesAdaptor;
