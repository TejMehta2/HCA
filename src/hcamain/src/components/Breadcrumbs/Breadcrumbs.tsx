import React from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  svgMarkup: Field<string>;
};

type AncestorsFields = {
  title: { value: string };
  url: { path: string };
};

interface Fields {
  data: {
    item: {
      homeIcon: {
        Icon: HCAIconFields;
      };
    };
    contextItem: {
      title: { value: string };
      url: { path: string };
      ancestors: AncestorsFields[];
    };
  };
}

type BreadcrumbsProps = {
  params: {
    [key: string]: string;
  };
  fields: Fields;
};

const BreadcrumbsDefaultComponent = (props: BreadcrumbsProps): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Breadcrumbs no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: BreadcrumbsProps): JSX.Element => {
  if (!props.fields) {
    return <BreadcrumbsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      {props.fields.data.item?.homeIcon?.Icon.svgMarkup && (
        <span
          dangerouslySetInnerHTML={{
            __html: props.fields.data.item?.homeIcon.Icon.svgMarkup?.value,
          }}
        ></span>
      )}
      <Text field={props.fields.data.contextItem.title} />
      <br />
      <a href={props.fields.data.contextItem.url.path}>
        {props.fields.data.contextItem.url.path}
      </a>
      <br />
      <ul>
        {props.fields.data.contextItem.ancestors.map((ancestor, index) => (
          <li key={index}>
            <Text field={ancestor.title} />
            <br />
            <a href={ancestor.url.path}>{ancestor.url.path}</a>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};
