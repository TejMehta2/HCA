import React from 'react';
import {
  Field,
  Placeholder,
  ComponentRendering,
  ImageField,
  RichText,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HeaderWithImage, {
  getDynamicTitleStyle,
} from '@component-library/site-components/HeaderWithImage/HeaderWithImage';
import Text from '@component-library/foundation/Text/Text';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import getHeadingTags from 'lib/getHeadingTags';
import { getPresentationParam } from 'lib/utility-functions/getPresentationParam';

interface Fields {
  data?: {
    contextItem?: {
      title?: { jsonValue?: Field<string> };
      subHeading?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
    };
  };
}

interface HeaderWithImageParams extends Params {
  HeadingBeforeTitle?: '1' | '0';
}

export type HeaderWithImageProps = {
  params?: HeaderWithImageParams;
  rendering?: ComponentRendering;
  fields?: Fields;
};

interface HeaderWithImageVariantProps extends HeaderWithImageProps {
  contentVariation?: 'fullWidthImage';
}

const darkThemes = [
  'B-HCA-Navy-Blue',
  'C-HCA-Denim',
  'Palace-Grey',
  'Chelsea-Navy-Blue',
  'Alan-Black',
] as const;

const HeaderWithImageDefaultComponent = (
  props: HeaderWithImageProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Header With Image. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: HeaderWithImageVariantProps): JSX.Element => {
  const phKeyCtas = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  const phKeyRatings = `header-with-image-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeaderWithImageDefaultComponent {...props} />;
  }
  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.contextItem?.subHeading?.jsonValue?.value
  );

  const titleLength =
    props.fields?.data?.contextItem?.title?.jsonValue?.value?.length;

  const textWidth = (getPresentationParam(props?.params?.styles, 'textwidth') ??
    'standard') as 'wide' | 'standard' | undefined;

  return (
    <HeaderWithImage
      contentVariation={props.contentVariation}
      theme={props.params?.Theme || 'D-HCA-Teal'}
      textWidth={textWidth}
      title={
        <Text
          variation={
            props.params?.HeadingSize || getDynamicTitleStyle(titleLength)
          }
          tag={headingTag}
        >
          <RichText field={props.fields?.data?.contextItem?.title?.jsonValue} />
        </Text>
      }
      subtitle={
        props.fields?.data?.contextItem?.subHeading?.jsonValue?.value ? (
          <Text variation="subheading-1" tag={subheadingTag}>
            <JSSText
              field={props.fields?.data?.contextItem?.subHeading?.jsonValue}
            />
          </Text>
        ) : undefined
      }
      subtitlePlacement={
        props.params?.HeadingBeforeTitle === '1' ? 'before' : 'after'
      }
      copy={
        <Text variation="body-large" tag="div">
          <RichText field={props.fields?.data?.contextItem?.text?.jsonValue} />
        </Text>
      }
      image={
        <NextJssImage
          field={props.fields?.data?.contextItem?.image?.jsonValue}
          next={{
            fill: true,
            sizes: '100vw',
            loading: 'eager',
            priority: true,
          }}
        />
      }
      ratings={
        props.rendering ? (
          <Placeholder
            name={phKeyRatings}
            rendering={props.rendering}
            size={buttonSize}
            contentVariation="full-width"
          />
        ) : (
          <></>
        )
      }
      ctas={
        props.rendering ? (
          <Placeholder
            name={phKeyCtas}
            rendering={props.rendering}
            size={buttonSize}
            contentVariation="full-width"
          />
        ) : (
          <></>
        )
      }
    />
  );
};

export const FullWidthImage = (
  props: HeaderWithImageVariantProps
): JSX.Element => {
  if (!props.fields) {
    return <HeaderWithImageDefaultComponent {...props} />;
  }

  //make sure fulwidthimage variant has one of dark themes, if not fallback to default dark theme
  const nextProps: HeaderWithImageVariantProps = {
    ...props,
    params: {
      ...props.params,
      Theme: darkThemes.includes(props.params?.Theme as any)
        ? props.params?.Theme
        : 'B-HCA-Navy-Blue',
    },
  };

  return <Default {...nextProps} contentVariation="fullWidthImage" />;
};
