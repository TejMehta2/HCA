import React from 'react';
import {
  Field,
  Item,
  Text as JssText,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import Params from 'src/types/params';

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
    FilterValue?: Item;
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
  ResultsPerPage?: Field<string>;
  SearchBy?: SortOptionsFields[];
  FilterBy?: SortOptionsFields[];
}

type BlogSearchProps = {
  params?: Params;
  fields?: Fields;
};

const BlogSearchDefaultComponent = (props: BlogSearchProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">BlogSearch no datasource</span>
    </div>
  </div>
);

export const Default = (props: BlogSearchProps): JSX.Element => {
  const { t } = useI18n();
  if (!props.fields) {
    return <BlogSearchDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      <JssText field={props.fields?.Heading} />
      <br />
      <JssText field={props.fields?.Title} />
      <br />
      <RichText tag="span" field={props.fields?.Text} />
      <br />
      <JssText field={props.fields?.SearchPlaceholder} />
      <br />
      {props?.fields?.FilterOptionsIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html:
              props?.fields?.FilterOptionsIcon?.fields?.SvgMarkup?.value || '',
          }}
        />
      )}
      <JssText field={props.fields?.FilterOptionsText} />
      <br />
      <ul>
        {props.fields?.FilterOptions?.map((filterOptions, index) => (
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
                  <span>{filter?.fields?.FilterValue?.id}</span>
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
            __html:
              props?.fields?.SortOptionsIcon?.fields?.SvgMarkup?.value || '',
          }}
        />
      )}
      <JssText field={props.fields?.SortOptionsText} />
      <br />
      <ul>
        {props.fields?.SortOptions?.map((sortOptions, index) => (
          <li key={index}>
            <JssText field={sortOptions?.fields?.DisplayName} />
            <br />
            <JssText field={sortOptions?.fields?.Filter} />
            <br />
            <span>{sortOptions?.fields?.FilterValue?.id}</span>
            <br />
          </li>
        ))}
      </ul>
      <br />
      <JssText field={props.fields?.SearchResultsText} />
      <br />
      <JssText field={props.fields?.ResultsPerPage} />
      <br />
      <ul>
        {props.fields?.FilterBy?.map((filterBy, index) => (
          <li key={index}>
            <JssText field={filterBy?.fields?.DisplayName} />
            <br />
            <JssText field={filterBy?.fields?.Filter} />
            <br />
            <span>{filterBy?.fields?.FilterValue?.id}</span>
          </li>
        ))}
      </ul>
      <br />
      <ul>
        {props.fields?.SearchBy?.map((searchby, index) => (
          <li key={index}>
            <JssText field={searchby?.fields?.DisplayName} />
            <br />
            <JssText field={searchby?.fields?.Filter} />
            <br />
            <span>{searchby?.fields?.FilterValue?.id}</span>
          </li>
        ))}
      </ul>
      <br />
      <p>Text: {t('close')}</p>
      <p>Text: {t('show-more')}</p>
      <p>Text: {t('showing')}</p>
      <p>Text: {t('clear-all')}</p>
    </div>
  );
};
