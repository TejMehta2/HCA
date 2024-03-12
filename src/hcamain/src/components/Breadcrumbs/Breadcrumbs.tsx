import React from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import Params from 'src/types/params';

type HCAIconFields = {
  svgMarkup?: Field<string>;
};

type AncestorsFields = {
  navigationTitle?: { value?: string };
  abstractTitle?: { value?: string };
  displayName?: string;
  name?: string;
  url?: { url?: string };
};

interface Fields {
  data?: {
    item?: {
      homeIcon?: {
        Icon?: HCAIconFields;
      };
    };
    contextItem?: {
      navigationTitle?: { value?: string };
      abstractTitle?: { value?: string };
      displayName?: string;
      name?: string;
      ancestors?: AncestorsFields[];
    };
  };
}

type BreadcrumbsProps = {
  params?: Params;
  fields?: Fields;
};

const BreadcrumbsDefaultComponent = (props: BreadcrumbsProps): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
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

  const getTitle = (data?: AncestorsFields) => {
    if (data?.navigationTitle?.value) {
      return data?.navigationTitle?.value;
    } else if (data?.abstractTitle) {
      return data?.abstractTitle?.value;
    } else if (data?.displayName) {
      return data?.displayName;
    } else {
      return data?.name;
    }
  };

  const breadcrumbList = props.fields?.data?.contextItem?.ancestors?.map(
    (ancestor, index) => {
      const title = getTitle(ancestor);

      return (
        <Link href={ancestor?.url?.url || ''} key={index}>
          {title}
        </Link>
      );
    }
  );

  //  remove home which should be the last item in ancestors
  breadcrumbList?.pop();
  const title = getTitle(props.fields?.data?.contextItem);
  breadcrumbList?.push(<span key={breadcrumbList?.length}>{title}</span>);

  if (!props?.fields?.data?.contextItem?.ancestors?.length) {
    return <></>;
  }

  return <Breadcrumbs children={breadcrumbList} />;
};
