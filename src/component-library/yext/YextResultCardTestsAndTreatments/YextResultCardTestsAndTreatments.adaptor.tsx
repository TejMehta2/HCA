import React from 'react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import { CardProps } from '@yext/search-ui-react';
import { Ce_patientStory } from '../../types/yext/articles';
import YextResultCardArticles from '../YextResultCardArticles/YextResultCardArticles';
import Icons from '../../foundation/Icons/Icons';

const YextResultCardTestsAndTreatments = (
  props: CardProps<Ce_patientStory>
): JSX.Element => {
  const { result } = props;
  const { rawData } = result;

  const {
    c_answersPrimaryCallToAction,
    c_body,
    c_nameRichText,
    c_primaryImage,
    c_uRL,
    name,
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

export default YextResultCardTestsAndTreatments;
