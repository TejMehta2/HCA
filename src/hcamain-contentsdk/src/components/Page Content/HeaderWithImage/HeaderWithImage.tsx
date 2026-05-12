import { type JSX } from 'react';
import { ComponentWithContextProps } from 'lib/component-props';
import componentMap from '.sitecore/component-map';

import {
  Field,
  AppPlaceholder,
  ComponentRendering,
  ImageField,
  RichText,
  Text as JSSText,
} from '@sitecore-content-sdk/nextjs';
import HeaderWithImage, {
  getDynamicTitleStyle,
} from '@component-library/site-components/HeaderWithImage/HeaderWithImage';
import Text from '@component-library/foundation/Text/Text';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import Params, { DarkTheme, darkThemes } from 'src/types/params';
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

export type HeaderWithImageProps = ComponentWithContextProps & {
  params?: HeaderWithImageParams;
  rendering?: ComponentRendering;
  fields?: Fields;
};

interface HeaderWithImageVariantProps extends HeaderWithImageProps {
  contentVariation?: 'fullWidthImage';
}

const HeaderWithImageDefaultComponent = (
  props: HeaderWithImageProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

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
          <AppPlaceholder
            name={phKeyRatings}
            rendering={props.rendering}
              page={props.page}
              componentMap={componentMap}
            size={buttonSize}
            contentVariation="full-width"
          />
        ) : (
          <></>
        )
      }
      ctas={
        props.rendering ? (
          <AppPlaceholder
            name={phKeyCtas}
            rendering={props.rendering}
              page={props.page}
              componentMap={componentMap}
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
      Theme: darkThemes.includes(props.params?.Theme as DarkTheme)
        ? props.params?.Theme
        : 'B-HCA-Navy-Blue',
    },
  };

  return <Default {...nextProps} contentVariation="fullWidthImage" />;
};
