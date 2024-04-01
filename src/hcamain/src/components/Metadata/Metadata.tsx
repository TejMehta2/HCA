import React from 'react';
import { Field, ImageField,useSitecoreContext, } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Head from 'next/head';

type PageRouteMetadata = {
  fields?:
  {
  AbstractTitle?: { value?: Field<string> };
  AbstractText?: { value?: Field<string> };
  AbstractImage?: { value?: ImageField };
  title?: { value?: Field<string> };
  text?: { value?: Field<string> };
  image?: { value?: ImageField };
  metaTitle?: { value?: Field<string> };
  metaDescription?: { value?: Field<string> };
  metaImage?: { value?: ImageField };
  noIndex?: { value?: Field<string> };
  noFollow?: { value?: Field<string> };
}
  itemId?: string;
};

interface Fields {
  DefaultMetaImage?: { value?: ImageField };
  PageTitleSufix?: { value?: Field<string> };
  TwitterCard?: { value?: Field<string> };
}

type MetadataProps = {
  params?: Params;
  fields?: Fields;
};

const MetadataDefaultComponent = (): JSX.Element => <></>;

export const Default = (props: MetadataProps): JSX.Element => {
  const route= useSitecoreContext().sitecoreContext?.route as PageRouteMetadata;
  if (!props.fields) {
    return <MetadataDefaultComponent />;
  }
  return (
    <Head>
     <meta name="pageId" content={route.itemId}></meta>
  </Head>
  );
};
