import React from 'react';
import {
  Field,
  GetStaticComponentProps,
  ImageField,
  useComponentProps,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Head from 'next/head';

export interface PageRouteMetadata {
  fields?: {
    Title: Field<string>;
    MetaDescription?: Field<string>;
    MetaImage?: ImageField;
    MetaTitle?: Field<string>;
    NoFollow?: Field<boolean>;
    NoIndex?: Field<boolean>;
    AbstractTitle?: Field<string>;
    AbstractText?: Field<string>;
    AbstractImage?: ImageField;
    Image?: ImageField;
    Text?: Field<string>;
    EntityName?: Field<string>;
    HideFromWebsiteSearch?: Field<boolean>;
    JsonLdSchema?: Field<string>;
  };
  itemId?: string;
  templateId?: string;
}

interface Fields {
  DefaultMetaImage?: { value?: ImageField };
  PageTitleSufix?: { value?: Field<string> };
  TwitterCard?: { value?: Field<string> };
}

type MetadataProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};

const MetadataDefaultComponent = (): JSX.Element => <></>;

export const Default = (props: MetadataProps): JSX.Element => {
  // hooks
  const context = useSitecoreContext();
  const url = useComponentProps<string>(props.rendering?.uid);

  const route = context.sitecoreContext?.route as PageRouteMetadata;
  const { fields } = route;

  if (!fields || !props?.fields) return <MetadataDefaultComponent />;

  // prop values
  const { DefaultMetaImage, PageTitleSufix, TwitterCard } = props?.fields;

  // route values
  const {
    Title,
    MetaDescription,
    MetaImage,
    MetaTitle,
    NoFollow,
    NoIndex,
    AbstractText,
    AbstractTitle,
    AbstractImage,
    Image,
    Text,
    HideFromWebsiteSearch,
  } = fields;
  const PageId = route?.itemId?.replaceAll(/[{\-}]/g, '').toLowerCase(); // Todo replace
  const TemplateId = route?.templateId?.replaceAll(/[{\-}]/g, '').toLowerCase(); // Todo replace

  // computed values
  const title = `${MetaTitle?.value || Title?.value} ${
    PageTitleSufix?.value?.value || ''
  }`;
  const description = MetaDescription?.value || Text?.value;
  const image =
    MetaImage?.value?.src ||
    Image?.value?.src ||
    DefaultMetaImage?.value?.value?.src;

  const addThumbnailParameter = (image?: string) => {
    try {
      if (!image) return image;
      const imageUrl = new URL(image);
      const urlSearchParams = new URLSearchParams(imageUrl.search);
      urlSearchParams.set('t', 'cardthumbnail');
      imageUrl.search = urlSearchParams.toString();
      return imageUrl.href;
    } catch (err) {
      process.env.NODE_ENV === 'development' && console.error(err);
      return image;
    }
  };

  const follow = NoFollow?.value ? 'nofollow' : 'follow';
  const index = NoIndex?.value ? 'noindex' : 'index';

  return (
    <Head>
      <meta name="twitter:card" content={TwitterCard?.value?.value} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="robots" content={`${follow}, ${index}`} />
      <meta name="title" content={title} />
      <meta name="pageTitle" content={Title?.value} />
      <meta name="pageText" content={Text?.value} />
      <meta
        name="pageImage"
        content={addThumbnailParameter(Image?.value?.src)}
      />
      <meta name="pageId" content={PageId} />
      <meta name="templateId" content={TemplateId} />
      <meta
        name="hideFromWebsiteSearch"
        content={HideFromWebsiteSearch?.value.valueOf().toString()}
      />
      <meta name="abstractTitle" content={AbstractTitle?.value} />
      <meta name="abstractText" content={AbstractText?.value} />
      <meta
        name="abstractImage"
        content={addThumbnailParameter(AbstractImage?.value?.src)}
      />
    </Head>
  );
};

export const getStaticProps: GetStaticComponentProps = async (
  _: MetadataProps,
  layoutData
) => {
  const path = layoutData?.sitecore?.context?.itemPath;
  const url = `${process.env.BASE_URL}${path}`; // Todo check with BE if we can get the domain or full URL from Sitecore data
  return url;
};
