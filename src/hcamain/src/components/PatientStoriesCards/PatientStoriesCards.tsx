import React from 'react';
import {
  Item,
  Field,
  LinkField,
  ImageField,
  Text as JssText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type FilterOptionsFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { jsonValue?: Item };
};

type PatientStoriesFields = {
  abstractTitle?: Field<string>;
  abstractText?: Field<string>;
  abstractImage?: { jsonValue?: ImageField };
  title?: { value?: Field<string> };
  text?: { value?: Field<string> };
  image?: { jsonValue?: ImageField };
  url?: { path?: string };
};

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      patientStories?: {
        PatientStoriesList?: PatientStoriesFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      cTAText?: { jsonValue?: Field<string> };
      searchOptions?: {
        SearchOptionsList?: FilterOptionsFields[];
      };
      filterOptions?: {
        filterOptionsList?: FilterOptionsFields[];
      };
    };
    contextItemSearchParams?: {
      serviceLineId?: string;
      locationId?: string;
    };
    contextItemSearchIdParams?: {
      serviceLineId?: string;
      locationId?: string;
    };
  };
}

type PatientStoriesCardsProps = {
  params?: Params;
  fields: Fields;
};

const PatientStoriesCardsDefaultComponent = (
  props: PatientStoriesCardsProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Patient Stories Cards please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: PatientStoriesCardsProps): JSX.Element => {
  if (!props.fields) {
    return <PatientStoriesCardsDefaultComponent {...props} />;
  }
  return <JssText field={props.fields?.data?.item?.title?.jsonValue} />;
};
