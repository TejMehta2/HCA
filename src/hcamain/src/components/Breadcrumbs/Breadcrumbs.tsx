import React from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import Params from 'src/types/params';
import Head from 'next/head';
import TextLink from '@component-library/core-components/TextLink/TextLink';

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

type BreadcrumbSchema = {
  '@type': string;
  position: number;
  name: string | undefined;
  item?: string | undefined;
}[];

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

  const breadcrumbSchemaItem: BreadcrumbSchema = [];

  const breadcrumbList = props.fields?.data?.contextItem?.ancestors?.map(
    (ancestor, index) => {
      const title = getTitle(ancestor);

      breadcrumbSchemaItem.push({
        '@type': 'ListItem',
        position: index + 1,
        name: title,
        item: ancestor?.url?.url,
      });

      return (
        <TextLink key={index}>
          <Link href={ancestor?.url?.url || ''}>{title}</Link>
        </TextLink>
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

  breadcrumbSchemaItem.push({
    '@type': 'ListItem',
    position: breadcrumbSchemaItem.length + 1,
    name: title,
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbSchemaItem,
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <Breadcrumbs children={breadcrumbList} />
    </>
  );
};
