import React from 'react';
import {
  Field,
  LinkField,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Button from '@component-library/core-components/Button/Button';

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
      cTALink?: { jsonValue?: LinkField };
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
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">FindAConsultantCTA no datasource</span>
    </div>
  </div>
);

export const Default = (props: FindAConsultantCTAProps): JSX.Element => {
  if (!props.fields) {
    return <FindAConsultantCTADefaultComponent {...props} />;
  }

  const filterList = [];

  if (props.fields?.data?.item?.customFilters?.CustomFiltersList) {
    for (const filter of props.fields.data.item.customFilters
      .CustomFiltersList) {
      filterList.push(
        filter.filter?.value + '=' + filter.filterValueString?.value
      );
    }
  }

  if (props.fields?.data?.item?.practice?.PracticeList) {
    for (const filter of props.fields?.data?.item?.practice?.PracticeList) {
      filterList.push('practice=' + filter.doctifyPractice?.value);
    }
  }

  if (props.fields?.data?.item?.service?.ServicesList) {
    for (const filter of props.fields?.data?.item?.service?.ServicesList) {
      filterList.push('service=' + filter.doctifyKeywordId?.value);
    }
  }

  const filterParams = filterList ? '?' + filterList.join('&') : '';

  return (
    <Button size="large" variation="full">
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
                    props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value ||
                    '',
                }}
              ></span>
            )}
            <JssRichText
              field={{
                value:
                  props.fields?.data?.item?.cTALink?.jsonValue?.value?.text ||
                  '',
              }}
            />
          </>
        )}
      </a>
    </Button>
  );
};
