import React from 'react';
import {
  Field,
  LinkField,
  Item,
  Text as JssText,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type SortOptionsFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValue?: { jsonValue?: Item };
};

type BlogPageFields = {
  title?: { jsonValue?: Field<string> };
  text?: { jsonValue?: Field<string> };
  date?: { jsonValue?: Field<string> };
  articleType?: { targetItem?: ArticleTypeFields };
};

type ArticleTypeFields = {
  title?: { value?: string };
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
      articles?: {
        ArticlesList?: BlogPageFields[];
      };
      searchBy?: {
        SearchByList?: SortOptionsFields[];
      };
      filterOptions?: {
        FilterByList?: SortOptionsFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      blogUrl?: { jsonValue?: LinkField };
    };
    contextItem?: {
      categoryId?: { jsonValue?: Field<string> };
    };
  };
}

type BlogRelatedArticlesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BlogRelatedArticlesDefaultComponent = (
  props: BlogRelatedArticlesProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">BlogRelatedArticles no datasource</span>
    </div>
  </div>
);

export const Default = (props: BlogRelatedArticlesProps): JSX.Element => {
  if (!props.fields) {
    return <BlogRelatedArticlesDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props?.fields?.data?.item?.heading?.jsonValue} />
      <br />
      <JssText field={props?.fields?.data?.item?.title?.jsonValue} />
      <br />
      <RichText tag="span" field={props?.fields?.data?.item?.text?.jsonValue} />
      <br />
      <ul>
        {props.fields?.data?.item?.searchBy?.SearchByList?.map(
          (searchBy, index) => (
            <li key={index}>
              <JssText field={searchBy.displayName} />
              <br />
              <JssText field={searchBy.filter} />
              <br />
              <span>{searchBy?.filterValue?.jsonValue?.id}</span>
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <JssText field={props.fields?.data?.item?.numberOfCards?.jsonValue} />
      <br />
      <a href={props.fields?.data?.item?.blogUrl?.jsonValue?.value?.href}></a>
    </div>
  );
};
