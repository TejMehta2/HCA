import React from 'react';
import {
  Field,
  Item,
  Text as JssText,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type FilterOptionsFields = {
  fields?: {
    Header?: Field<string>;
    Filters?: SortOptionsFields[];
  };
};

type SortOptionsFields = {
  fields?: {
    DisplayName?: Field<string>;
    Filter?: Field<string>;
    FilterValueString?: Field<string>;
    FilterValueGuid?: Item;
  };
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  SearchPlaceholder?: Field<string>;
  FilterOptionsIcon?: HCAIconFields;
  FilterOptionsText?: Field<string>;
  FilterOptions?: FilterOptionsFields[];
  SortOptionsIcon?: HCAIconFields;
  SortOptionsText?: Field<string>;
  SortOptions?: SortOptionsFields[];
  SearchResultsText?: Field<string>;
  ResultsPerPage?: Field<number>;
  SearchBy?: SortOptionsFields[];
  FilterBy?: SortOptionsFields[];
}

type PatientStoriesSearchProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PatientStoriesSearchDefaultComponent = (
  props: PatientStoriesSearchProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">PatientStoriesSearch no datasource</span>
    </div>
  </div>
);

export const Default = (props: PatientStoriesSearchProps): JSX.Element => {
  const { t } = useI18n();
  if (!props.fields) {
    return <PatientStoriesSearchDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props?.fields?.Heading} />
      <br />
      <JssText field={props?.fields?.Title} />
      <br />
      <RichText tag="span" field={props?.fields?.Text} />
      <br />
      <JssText field={props?.fields?.SearchPlaceholder} />
      <br />
      <span
        dangerouslySetInnerHTML={{
          __html:
            props?.fields?.FilterOptionsIcon?.fields?.SvgMarkup?.value || '',
        }}
      ></span>
      <br />
      <JssText field={props?.fields?.FilterOptionsText} />
      <br />
      <ul>
        {props?.fields?.FilterOptions?.map((filterOptions, index) => (
          <li key={index}>
            <br />
            <JssText field={filterOptions?.fields?.Header} />
            <br />
            <ul>
              {filterOptions?.fields?.Filters?.map((filter, index) => (
                <li key={index}>
                  <JssText field={filter?.fields?.DisplayName} />
                  <br />
                  <JssText field={filter?.fields?.Filter} />
                  <br />
                  <span>{filter?.fields?.FilterValueGuid?.id}</span>
                  <br />
                </li>
              ))}
            </ul>
            <br />
          </li>
        ))}
      </ul>
      <br />
      <span
        dangerouslySetInnerHTML={{
          __html:
            props?.fields?.SortOptionsIcon?.fields?.SvgMarkup?.value || '',
        }}
      ></span>
      <JssText field={props?.fields?.SortOptionsText} />
      <br />
      <ul>
        {props?.fields?.SortOptions?.map((sortOptions, index) => (
          <li key={index}>
            <JssText field={sortOptions?.fields?.DisplayName} />
            <br />
            <JssText field={sortOptions?.fields?.Filter} />
            <br />
            <span>{sortOptions?.fields?.FilterValueGuid?.id}</span>
            <br />
          </li>
        ))}
      </ul>
      <br />
      <JssText field={props?.fields?.SearchResultsText} />
      <br />
      <JssText field={props?.fields?.ResultsPerPage} />
      <br />
      <p>Text: {t('close')}</p>
      <br />
      <p>Text: {t('show-more')}</p>
      <br />
      <p>Text: {t('showing')}</p>
      <br />
      <p>Text: {t('clear-all')}</p>
    </div>
  );
};
