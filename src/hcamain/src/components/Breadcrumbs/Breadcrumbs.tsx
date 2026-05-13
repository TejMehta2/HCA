import React from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import Params from 'src/types/params';
import Head from 'next/head';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';

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
  if (!props.fields || !props?.fields?.data?.contextItem?.ancestors?.length) {
    return <BreadcrumbsDefaultComponent {...props} />;
  }

  const breadcrumbSchemaItem: BreadcrumbSchema = [];
  const ancestors =
    ('toReversed' in props.fields?.data?.contextItem?.ancestors &&
      props.fields?.data?.contextItem?.ancestors?.toReversed()) ||
    [];
  const thisPage: AncestorsFields = {
    name: props.fields?.data?.contextItem?.name,
  };

  const combinedList = [...ancestors, thisPage];
  const breadcrumbList = combinedList.map((item, index) => {
    const title =
      item?.navigationTitle?.value ||
      item?.abstractTitle?.value ||
      item?.displayName ||
      item?.name;

    if (item?.url?.url) {
      breadcrumbSchemaItem.push({
        '@type': 'ListItem',
        position: index + 1,
        name: title,
        item: item?.url?.url,
      });
      return (
        <TextLink key={index}>
          {index === 0 ? (
            <Link href={item?.url?.url}>
              <Icons iconName="iconHome"></Icons>
              <span className="sr-only">Home</span>
            </Link>
          ) : (
            <Link href={item?.url?.url || ''}>{title}</Link>
          )}
        </TextLink>
      );
    }
    breadcrumbSchemaItem.push({
      '@type': 'ListItem',
      position: index + 1,
      name: title,
    });
    return <span key={index}>{title}</span>;
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
      <Breadcrumbs
        theme={props.params?.Theme || 'A-HCA-White'}
        collapse={true}
        backCta={{
          link: combinedList[1].url?.url,
          text: combinedList[1].displayName,
        }}
      >
        <>{breadcrumbList}</>
      </Breadcrumbs>
    </>
  );
};
