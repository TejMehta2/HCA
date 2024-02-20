import React from 'react';
import { Field, Text as JssText } from '@sitecore-jss/sitecore-jss-nextjs';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';

type HCAIconFields = {
  svgMarkup: Field<string>;
};

type AncestorsFields = {
  title: { jsonValue: Field<string> };
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
      title: { jsonValue: Field<string> };
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

  const breadcrumbList = props.fields.data.contextItem.ancestors.map(
    (ancestor, index) => (
      <Link href={ancestor.url.path} key={index}>
        <JssText field={ancestor.title.jsonValue} />
      </Link>
    )
  );

  breadcrumbList.push(
    <span key={breadcrumbList.length}>
      <JssText field={props.fields.data.contextItem.title.jsonValue} />
    </span>
  );

  return <Breadcrumbs children={breadcrumbList} />;
};
