import React from 'react';
import {
  Field,
  LinkField,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Button from '@component-library/core-components/Button/Button';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type PracticeFields = {
  doctifyPractice?: { value?: string };
};

type ServiceFields = {
  doctifyKeywordId?: { value?: string };
};

type CustomFilters = {
  filter?: { value?: string };
  filterValueString?: { value?: string };
};

interface Fields {
  data?: {
    item?: {
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink: { jsonValue: LinkField };
      practice?: {
        PracticeList?: PracticeFields[];
      };
      service?: {
        ServicesList?: ServiceFields[];
      };
      customFilters?: {
        CustomFiltersList?: CustomFilters[];
      };
    };
    contextItem?: {
      doctifyKeywordId?: { value?: string };
      doctifyPractice?: { value?: string };
    };
  };
}

type FindAConsultantCTAProps = {
  params?: Params;
  fields?: Fields;
};

const FindAConsultantCTADefaultComponent = (
  props: FindAConsultantCTAProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Find a consultant CTA. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: FindAConsultantCTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <FindAConsultantCTADefaultComponent {...props} />;
  }

  const filterList = [];

  if (props.fields?.data?.contextItem?.doctifyPractice?.value) {
    filterList.push(
      'practice' + '=' + props.fields?.data?.contextItem?.doctifyPractice?.value
    );
  }

  if (props.fields?.data?.item?.customFilters?.CustomFiltersList) {
    for (const filter of props.fields.data.item.customFilters
      .CustomFiltersList) {
      if (filter.filter?.value && filter.filterValueString?.value) {
        filterList.push(
          filter.filter?.value + '=' + filter.filterValueString?.value
        );
      }
    }
  }

  if (props.fields?.data?.item?.practice?.PracticeList) {
    for (const filter of props.fields?.data?.item?.practice?.PracticeList) {
      if (filter.doctifyPractice?.value) {
        filterList.push('practice=' + filter.doctifyPractice?.value);
      }
    }
  }

  if (props.fields?.data?.item?.service?.ServicesList) {
    for (const filter of props.fields?.data?.item?.service?.ServicesList) {
      if (filter.doctifyKeywordId?.value) {
        filterList.push('keywordId=' + filter.doctifyKeywordId?.value);
        break;
      }
    }
  }

  //append keywordId of contextItem only if keywordId was not already set by ServicesList in a datasource
  if (
    !filterList.some((str) => str.startsWith('keywordId=')) &&
    props.fields?.data?.contextItem?.doctifyKeywordId?.value
  ) {
    filterList.push(
      'keywordId' +
        '=' +
        props.fields?.data?.contextItem?.doctifyKeywordId?.value
    );
  }

  const filterParams =
    filterList && filterList.length > 0 ? '?' + filterList.join('&') : '';

  return (
    <Button size="large" variation="full">
      {!isExperienceEditor ? (
        <a
          href={
            props.fields?.data?.item?.cTALink?.jsonValue?.value.href +
            filterParams
          }
        >
          {props.fields?.data?.item?.cTALink?.jsonValue?.value?.text && (
            <>
              {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup
                        ?.value || '',
                  }}
                ></span>
              )}
              <JssTextWithEntityName
                isRichText={true}
                field={{
                  value:
                    props.fields?.data?.item?.cTALink?.jsonValue?.value?.text ||
                    '',
                }}
              />
            </>
          )}
        </a>
      ) : (
        props?.fields?.data?.item && (
          <JssLink field={props.fields.data.item.cTALink.jsonValue}></JssLink>
        )
      )}
    </Button>
  );
};
