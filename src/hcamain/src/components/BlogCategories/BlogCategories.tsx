/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import ArticleCategories from '@component-library/site-components/ArticleCategories/ArticleCategories';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';

type CategoriesFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { targetItem: { id: string } };
};

interface Fields {
  data?: {
    item?: {
      title?: { jsonValue: Field<string> };
      categories?: {
        categoriesList?: CategoriesFields[];
      };
      blogUrl?: { jsonValue?: LinkField };
    };
  };
}

type BlogCategoriesProps = {
  params?: Params;
  fields?: Fields;
};

const BlogCategoriesDefaultComponent = (
  props?: BlogCategoriesProps
): JSX.Element => (
  <div className={`component ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">BlogCategories no datasource</span>
    </div>
  </div>
);

export const Default = (props: BlogCategoriesProps): JSX.Element => {
  if (!props.fields) {
    return <BlogCategoriesDefaultComponent {...props} />;
  }

  const componentTitle = props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    componentTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  return (
    <ArticleCategories
      id={componentAnchorId}
      {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
      theme={props.params?.Theme || 'G-HCA-Orange'}
      title={
        <Text
          variation={props.params?.HeadingSize || 'display-3'}
          tag={props.params?.HeadingTag || 'h3'}
        >
          <JssText field={props.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      categories={props.fields?.data?.item?.categories?.categoriesList?.map(
        (category, index) => (
          <a
            href={
              props.fields?.data?.item?.blogUrl?.jsonValue?.value.href +
              '?' +
              category.filter?.value +
              '=' +
              category.filterValueGuid?.targetItem?.id
            }
            key={index}
          >
            <Icons iconName="iconFilterCircle" />
            <span>
              <JssText field={category?.displayName} />
            </span>
          </a>
        )
      )}
    />
  );
};
