/* eslint-disable @next/next/next-script-for-ga */
import React from 'react';
import {
  Field,
  GetStaticComponentProps,
  ImageField,
  LinkField,
  debug,
  useComponentProps,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Head from 'next/head';
import { removeTags } from '@component-library/utility-functions';
import { addThumbnailParameter } from 'lib/utility-functions/addThumbnailParameter';
import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';

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
    Specialties?: Speciality[];
    Date?: Field<string>;
    CanonicalUrl?: LinkField;
  };
  itemId?: string;
  templateId?: string;
  displayName?: string;
}

interface Fields {
  DefaultMetaImage?: { value?: ImageField };
  PageTitleSufix?: { value?: Field<string> };
  TwitterCard?: { value?: Field<string> };
  Image?: ImageField;
  GtmKey?: { value?: Field<string> };
}

type MetadataProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};
interface Speciality {
  displayName: string;
  fields?: Fields;
  id: string;
  name: string;
  url: string;
}

const isValidDate = (dateStr: string): boolean => {
  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) return false;

  // Check if the date is not the minimal date
  return dateStr !== '0001-01-01T00:00:00Z';
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
    Date,
    CanonicalUrl,
  } = fields;
  const PageId = route?.itemId?.replaceAll(/[{\-}]/g, '').toLowerCase(); // Todo replace
  const TemplateId = route?.templateId?.replaceAll(/[{\-}]/g, '').toLowerCase(); // Todo replace
  const titleStripped = Title?.value.replace(/(<([^>]+)>)/gi, '');
  // computed values
  const title = `${MetaTitle?.value || titleStripped} ${
    PageTitleSufix?.value || ''
  }`;
  const description = MetaDescription?.value || Text?.value;
  const image =
    MetaImage?.value?.src ||
    Image?.value?.src ||
    DefaultMetaImage?.value?.value?.src;

  const follow = NoFollow?.value ? 'nofollow' : 'follow';
  const index = NoIndex?.value ? 'noindex' : 'index';

  const pageText = Text?.value ? removeTags(Text?.value) : '';
  const pageTitle = AbstractTitle?.value || Title.value;

  const canonicalLink = getCanonical(CanonicalUrl?.value?.href, url);

  type SchemaPageType =
    | 'Homepage'
    | 'Condition'
    | 'Treatment'
    | 'Test'
    | 'Hospital/Facility'
    | 'Generic'
    | 'CF'
    | '404';

  const getPageType = (templateId?: string): SchemaPageType => {
    switch (templateId) {
      case '0b18db9eacec4f9e99c061a20535af37':
        return 'Homepage';
      case 'b63580c44e8a49e4a7c80e09552fcfbc':
        return 'Treatment';
      case '9069a668fc8d4fcf902c55c18743aa88':
        return 'Test';
      case '9b38cf346e1748b6b48781931a90aa8a':
        return 'Condition';
      case 'ce35b67f8afb461a8ed31b9da4167731':
        return 'Hospital/Facility';
      case 'a32af27ae618403ab7859da2c68a0b66':
        return 'CF';
      default:
        return 'Generic';
    }
  };

  const globalGtmKey = process.env.NEXT_PUBLIC_GTM_KEY;
  const gtmKey = globalGtmKey ? globalGtmKey : props.fields?.GtmKey?.value;

  debug.common('process.env.NODE_ENV', process.env.NODE_ENV);
  debug.common('NEXT_PUBLIC_DISABLE_GTM', process.env.NEXT_PUBLIC_DISABLE_GTM);
  debug.common('props.fields.GtmKey.value', props.fields?.GtmKey?.value);

  const gtmTag = (!process.env.NEXT_PUBLIC_DISABLE_GTM ||
    process.env.NEXT_PUBLIC_DISABLE_GTM === 'false') && (
    <script
      id="gtm-snippet"
      dangerouslySetInnerHTML={{
        __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${gtmKey}');
          `,
      }}
    />
  );

  const cf: boolean = getPageType(TemplateId) === 'CF';

  if (cf) {
    return (
      <Head>
        {gtmTag}
        <meta name="robots" content={`${follow}, ${index}`} key="robots" />
      </Head>
    );
  } else {
    return (
      <Head>
        {gtmTag}
        &&
        {TwitterCard?.value?.value && (
          <meta name="twitters:card" content={TwitterCard?.value?.value} />
        )}
        &&
        {title && (
          <meta property="og:title" content={title} key="og:title" />
        )}{' '}
        &&
        {Date?.value && isValidDate(Date.value) && (
          <>
            <meta property="og:article:published_time" content={Date.value} />
            <meta name="publishedTime" content={Date.value} />
          </>
        )}
        &&
        {url && <meta property="og:url" content={url} />} &&
        <meta property="og:type" content="website" /> &&
        {image && (
          <meta property="og:image" content={image} key="og:image" />
        )}{' '}
        &&
        {canonicalLink && <link rel="canonical" href={canonicalLink} />} &&
        {description && <meta name="description" content={description} />} &&
        {follow && index && (
          <meta name="robots" content={`${follow}, ${index}`} key="robots" />
        )}
        &&
        {title && <meta name="title" content={title} />} &&
        {pageTitle && pageTitle !== '*' && (
          <meta name="pageTitle" content={pageTitle} />
        )}
        &&
        {pageText && <meta name="pageText" content={pageText} />} &&
        {Image?.value?.src && (
          <meta
            name="pageImage"
            content={addThumbnailParameter(Image?.value?.src)}
          />
        )}
        &&
        {PageId && <meta name="pageId" content={PageId} />} &&
        {TemplateId && <meta name="templateId" content={TemplateId} />} &&
        {HideFromWebsiteSearch?.value?.valueOf().toString() && (
          <meta
            name="hideFromWebsiteSearch"
            content={HideFromWebsiteSearch?.value?.valueOf().toString()}
          />
        )}
        &&
        {AbstractTitle?.value && (
          <meta name="abstractTitle" content={AbstractTitle?.value} />
        )}
        &&
        {AbstractText?.value && (
          <meta name="abstractText" content={AbstractText?.value} />
        )}
        &&
        {AbstractImage?.value?.src && (
          <meta
            name="abstractImage"
            content={addThumbnailParameter(AbstractImage?.value?.src)}
          />
        )}
      </Head>
    );
  }
};

function getCanonical(canonicalUrl?: string | null, contextPageUrl?: string) {
  if (!canonicalUrl) return contextPageUrl;

  if (!isAbsoluteUrl(canonicalUrl))
    canonicalUrl = `${process.env.BASE_URL}${canonicalUrl}`;

  return canonicalUrl;
}

export const getStaticProps: GetStaticComponentProps = async (
  _: MetadataProps,
  layoutData
) => {
  const path = layoutData?.sitecore?.context?.itemPath;
  const url = `${process.env.BASE_URL}${path}`; // Todo check with BE if we can get the domain or full URL from Sitecore data
  return url;
};
