import React from 'react';
import {
  Field,
  Text as JssText,
  Item,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import ArticleCategories from '@component-library/site-components/ArticleCategories/ArticleCategories';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';

type CategoriesFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { jsonValue?: Item };
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

  return (
    <ArticleCategories
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
              category.filter?.value
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
