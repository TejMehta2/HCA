import React from 'react';
import {
  Field,
  Placeholder,
  ComponentRendering,
  ImageField,
  RichText,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import VideoHero from '@component-library/careers/VideoHero/VideoHero';
import Text from '@component-library/foundation/Text/Text';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import getSubheadingTag from 'lib/subheading-tag-getter';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Themes from '@component-library/foundation/Themes/Themes';

interface Fields {
  data?: {
    contextItem?: {
      title?: { jsonValue?: Field<string> };
      subHeading?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
    };
    item?: {
      videoUrl?: { value?: string };
      videoThumbnail?: { jsonValue?: ImageField };
    };
  };
}

export type HeaderWithVideoProps = {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

const HeaderWithVideoDefaultComponent = (
  props: HeaderWithVideoProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Header With Video. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: HeaderWithVideoProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeaderWithVideoDefaultComponent {...props} />;
  }
  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety
  const hasVideo = props.fields.data?.item?.videoUrl?.value;
  const image = hasVideo
    ? props.fields.data?.item?.videoThumbnail?.jsonValue
    : props.fields?.data?.contextItem?.image?.jsonValue;
  return (
    <Themes theme={props.params?.Theme || 'B-HCA-Navy-Blue'}>
      <VideoHero
        title={
          <Text
            variation={props.params?.HeadingSize || 'display-1'}
            tag={props.params?.HeadingTag || 'h2'}
          >
            <RichText
              field={props.fields?.data?.contextItem?.title?.jsonValue}
            />
          </Text>
        }
        copy={
          <Text variation="body-large" tag="div">
            <RichText
              field={props.fields?.data?.contextItem?.text?.jsonValue}
            />
          </Text>
        }
        image={
          <NextJssImage
            field={image}
            next={{
              fill: true,
              sizes: '100vw',
              loading: 'eager',
              priority: true,
            }}
          />
        }
        children={
          props.rendering ? (
            <Placeholder
              name={phKey}
              rendering={props.rendering}
              size={buttonSize}
              contentVariation="full-width"
            />
          ) : (
            <></>
          )
        }
        subtitle={
          props.fields?.data?.contextItem?.subHeading?.jsonValue?.value ? (
            <Text
              variation="subheading-1"
              tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
            >
              <JSSText
                field={props.fields?.data?.contextItem?.subHeading?.jsonValue}
              />
            </Text>
          ) : undefined
        }
        videoSrc={props.fields.data?.item?.videoUrl?.value}
        videoAspectRatio={16 / 9}
      />
    </Themes>
  );
};
