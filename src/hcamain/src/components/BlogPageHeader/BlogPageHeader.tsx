import React from 'react';
import {
  Field,
  RichText,
  LinkField,
  Text as JssText,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import HeaderPlain from '@component-library/site-components/HeaderPlain/HeaderPlain';
import Params from 'src/types/params';
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
    Filter?: Field<string>;
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
  BlogUrl?: LinkField;
}

type BlogPageHeaderProps = {
  params?: Params;
  fields?: Fields;
};

const BlogPageHeaderDefaultComponent = (
  props: BlogPageHeaderProps
): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with image no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: BlogPageHeaderProps): JSX.Element => {
  const { t } = useI18n();
  if (!props.fields) {
    return <BlogPageHeaderDefaultComponent {...props} />;
  }
  return (
    <HeaderPlain
      theme={props.params?.Theme || 'A-HCA-White'}
      subheading={
        <Text variation="subheading-1">
          <JssText field={props.fields?.Heading} />
        </Text>
      }
      heading={
        <Text
          tag={props.params?.HeadingTag || 'h1'}
          variation={props.params?.HeadingSize || 'display-1'}
        >
          <JssText field={props.fields?.Title} />
        </Text>
      }
    >
      <RichText field={props.fields?.Text} />
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
                  <JssText field={filter?.fields?.Filter} />
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
            <JssText field={sortOptions?.fields?.Filter} />
            <br />
          </li>
        ))}
      </ul>
      <br />
      <JssText field={props?.fields?.SearchResultsText} />
      <br />
      <JssText field={props?.fields?.ResultsPerPage} />
      <br />
      <a href={props.fields?.BlogUrl?.value.href}></a>
      <br />
      <p>Text: {t('close')}</p>
      <br />
      <p>Text: {t('show-more')}</p>
      <br />
      <p>Text: {t('showing')}</p>
      <br />
      <p>Text: {t('clear-all')}</p>
    </HeaderPlain>
  );
};
