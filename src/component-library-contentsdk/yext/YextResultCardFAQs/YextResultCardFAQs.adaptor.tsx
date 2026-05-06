import React, { type JSX } from 'react';
import { CardProps } from '@yext/search-ui-react';
import YextResultCardFAQs from './YextResultCardFAQs';
import Faq from '../../types/yext/faqs';
import Button from '../../core-components/Button/Button';

const YextResultCardFAQsAdaptor = (props: CardProps<Faq>): JSX.Element => {
  const { result } = props;

  const {
    // source,
    // index,
    // name,
    // description,
    // link,
    // id,
    // distance,
    // distanceFromFilter,
    // highlightedFields,
    // entityType,
    // segment,
    // document,
    // documents,
    rawData,
  } = result;
  const {
    answer,
    // answerV2,
    // landingPageUrl,
    // nudgeEnabled,
    // primaryConversationContact,
    question,
    // slug,
    // logo,
    // name: rawData_name,
    // c_activeInSearch,
    c_answersPrimaryCallToAction,
    c_uRL,
    // c_answersSecondaryCallToAction,
    // c_linkedLocationFAQSection,
    // c_micrositeBrand,
    // c_contentGenTest,
    // keywords,
    // id: rawData_id,
    // timezone,
  } = rawData;

  return (
    <YextResultCardFAQs title={question}>
      <>
        {answer || ''}
        {c_uRL ? (
          <Button size={'large'} variation={'full'}>
            <a href={c_uRL}>
              <span>{c_answersPrimaryCallToAction?.label}</span>
            </a>
          </Button>
        ) : (
          <></>
        )}
      </>
    </YextResultCardFAQs>
  );
};

export default YextResultCardFAQsAdaptor;
