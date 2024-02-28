import React from 'react';
import {
  Field,
  Text as JssText,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type CategoriesFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValue?: { jsonValue?: Item };
};

interface Fields {
  data?: {
    item?: {
      title?: { jsonValue: Field<string> };
      categories?: {
        categoriesList?: CategoriesFields[];
      };
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
    <div className={`component ${props.params?.styles}`}>
      <JssText field={props.fields?.data?.item?.title?.jsonValue} />
      <br />
      <ul>
        {props.fields?.data?.item?.categories?.categoriesList?.map(
          (category, index) => (
            <li key={index}>
              <JssText field={category.displayName} />
              <br />
              <JssText field={category.filter} />
              <br />
              <span>{category?.filterValue?.jsonValue?.id}</span>
              <br />
            </li>
          )
        )}
      </ul>
      <br />
    </div>
  );
};
