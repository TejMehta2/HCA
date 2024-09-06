import React from 'react';
import {
  Field,
  RichText,
  Text as JssText,
  LinkFieldValue,
  useSitecoreContext,
  Link,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';

import Params from 'src/types/params';
import Themes from '@component-library/foundation/Themes/Themes';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

interface Fields {
  data?: {
    contextItem?: {
      subHeading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
    };
    item?: {
      searchPhrasePlaceholder?: { value?: string };
      selectAJobAreaLabel?: { value?: string };
      selectALocationLabel?: { value?: string };
      searchRolesCTA: { jsonValue: { value: LinkFieldValue } };
    };
  };
}

type CareersSearchHeroProps = {
  params?: Params;
  fields?: Fields;
};

const CareersSearchHeroDefaultComponent = (
  props: CareersSearchHeroProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Careers Search Hero. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: CareersSearchHeroProps): JSX.Element => {
  console.log('!props?.fields?:', props?.fields);
  if (!props?.fields?.data?.item) {
    return <CareersSearchHeroDefaultComponent {...props} />;
  }
  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <JssText field={props.fields?.data?.contextItem?.subHeading?.jsonValue} />

      <Text
        tag={props.params?.HeadingTag || 'h1'}
        variation={props.params?.HeadingSize || 'display-1'}
      >
        <JssText field={props.fields?.data?.contextItem?.title?.jsonValue} />
      </Text>

      <RichText field={props.fields?.data?.contextItem?.text?.jsonValue} />

      <NextJssImage
        field={props.fields?.data?.contextItem?.image?.jsonValue}
        next={{
          fill: true,
          sizes: '100vw',
          loading: 'eager',
          priority: true,
        }}
      />

      <p>Search controls:</p>
      <p>{props.fields?.data?.item?.searchPhrasePlaceholder?.value}</p>
      <p>{props.fields?.data?.item?.selectAJobAreaLabel?.value}</p>
      <p>{props.fields?.data?.item?.selectALocationLabel?.value}</p>
      <p>
        <Link field={props.fields.data.item.searchRolesCTA.jsonValue}></Link>
      </p>
    </Themes>
  );
};
