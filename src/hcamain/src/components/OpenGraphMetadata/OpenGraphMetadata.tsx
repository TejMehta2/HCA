import React from 'react';
import {
  Field,
  Text as JssText,
  Image as JssImage,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

interface Fields {
  data?: {
    item?: {
      defaultMetaImage?: { jsonValue?: ImageField };
      pageTitleSufix?: { jsonValue?: Field<string> };
      twitterCard?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      abstractTitle?: { jsonValue?: Field<string> };
      abstractText?: { jsonValue?: Field<string> };
      abstractImage?: { jsonValue?: ImageField };
      id?: string;
    };
  };
}

type OpenGraphMetadataProps = {
  params?: Params;
  fields?: Fields;
};

const OpenGraphMetadataDefaultComponent = (
  props: OpenGraphMetadataProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">OpenGraphMetadata no datasource</span>
    </div>
  </div>
);

export const Default = (props: OpenGraphMetadataProps): JSX.Element => {
  if (!props.fields) {
    return <OpenGraphMetadataDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      <JssText field={props.fields?.data?.item?.pageTitleSufix?.jsonValue} />
      <br />
      <JssImage field={props.fields?.data?.item?.defaultMetaImage?.jsonValue} />
      <br />
      <JssText field={props.fields?.data?.item?.twitterCard?.jsonValue} />
      <br />
      <JssText
        field={props.fields?.data?.contextItem?.abstractTitle?.jsonValue}
      />
      <br />
      <JssText
        field={props.fields?.data?.contextItem?.abstractText?.jsonValue}
      />
      <br />
      <JssImage
        field={props.fields?.data?.contextItem?.abstractImage?.jsonValue}
      />
      <span>{props.fields?.data?.contextItem?.id}</span>
    </div>
  );
};
