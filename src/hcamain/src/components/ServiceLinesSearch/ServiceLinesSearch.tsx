import React from 'react';
import {
  Field,
  Text as JssText,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

type FilterOptionsFields = {
  fields: {
    Header: Field<string>;
    Filters: SortOptionsFields[];
  };
};

type SortOptionsFields = {
  fields: {
    Filter: Field<string>;
  };
};

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
  SearchPlaceholder: Field<string>;
  FilterOptionsIcon: HCAIconFields;
  FilterOptionsText: Field<string>;
  FilterOptions: FilterOptionsFields[];
  SortOptionsIcon: HCAIconFields;
  SortOptionsText: Field<string>;
  SortOptions: SortOptionsFields[];
  SearchResultsText: Field<string>;
  ResultsPerPage: Field<string>;
}

type ServiceLinesSearchProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ServiceLinesSearchDefaultComponent = (
  props: ServiceLinesSearchProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ServiceLinesSearch no datasource</span>
    </div>
  </div>
);

export const Default = (props: ServiceLinesSearchProps): JSX.Element => {
  const { t } = useI18n();
  if (!props.fields) {
    return <ServiceLinesSearchDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props.fields.Heading} />
      <br />
      <JssText field={props.fields.Title} />
      <br />
      <RichText tag="span" field={props.fields.Text} />
      <br />
      <JssText field={props.fields.SearchPlaceholder} />
      <br />
      {props?.fields?.FilterOptionsIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props?.fields?.FilterOptionsIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <JssText field={props.fields.FilterOptionsText} />
      <br />
      <ul>
        {props.fields.FilterOptions.map((filterOptions, index) => (
          <li key={index}>
            <br />
            <JssText field={filterOptions.fields.Header} />
            <br />
            <ul>
              {filterOptions.fields.Filters.map((filter, index) => (
                <li key={index}>
                  <JssText field={filter.fields.Filter} />
                  <br />
                </li>
              ))}
            </ul>
            <br />
          </li>
        ))}
      </ul>
      <br />
      {props?.fields?.SortOptionsIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props?.fields?.SortOptionsIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <JssText field={props.fields.SortOptionsText} />
      <br />
      <ul>
        {props.fields.SortOptions.map((sortOptions, index) => (
          <li key={index}>
            <JssText field={sortOptions.fields.Filter} />
            <br />
          </li>
        ))}
      </ul>
      <br />
      <JssText field={props.fields.SearchResultsText} />
      <JssText field={props.fields.ResultsPerPage} />
      <p>Text: {t('close')}</p>
      <p>Text: {t('show-more')}</p>
      <p>Text: {t('showing')}</p>
      <p>Text: {t('clear-all')}</p>
    </div>
  );
};
