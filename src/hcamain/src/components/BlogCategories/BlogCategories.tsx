import React from 'react';
import {
  Field,
  Text as JssText,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';

type CategoriesFields = {
  displayName: { value: string };
  filter: { value: string };
  filterValue: { jsonValue: Item };
};

interface Fields {
  data: {
    item: {
      title: { jsonValue: Field<string> };
      categories: {
        categoriesList: CategoriesFields[];
      };
    };
  };
}

type BlogCategoriesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BlogCategoriesDefaultComponent = (
  props: BlogCategoriesProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
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
    <div className={`component ${props.params.styles}`}>
      <JssText field={props.fields.data.item.title.jsonValue} />
      <br />
      <ul>
        {props.fields.data.item.categories.categoriesList.map(
          (categorie, index) => (
            <li key={index}>
              <JssText field={categorie.displayName} />
              <br />
              <JssText field={categorie.filter} />
              <br />
              <span>{categorie.filterValue.jsonValue?.id?.replaceAll("-","")}</span>
              <br />
            </li>
          )
        )}
      </ul>
      <br />
    </div>
  );
};
