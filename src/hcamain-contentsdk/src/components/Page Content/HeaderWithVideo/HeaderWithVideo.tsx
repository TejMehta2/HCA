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
import VideoHero from '@component-library/careers/VideoHero/VideoHero';
import Text from '@component-library/foundation/Text/Text';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import Params from 'src/types/params';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Themes from '@component-library/foundation/Themes/Themes';
import getHeadingTags from 'lib/getHeadingTags';

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

export type HeaderWithVideoProps = ComponentWithContextProps & {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

const HeaderWithVideoDefaultComponent = (
  props: HeaderWithVideoProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

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
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.contextItem?.subHeading?.jsonValue?.value
  );

  const titleLength =
    props.fields?.data?.contextItem?.title?.jsonValue?.value?.length;
  const getDynamicTitleStyle = (length?: number) => {
    if (!length) return 'display-1';
    if (length >= 50) {
      return 'display-6';
    } else if (length >= 40) {
      return 'display-5';
    } else if (length >= 30) {
      return 'display-4';
    } else if (length >= 20) {
      return 'display-3';
    } else if (length >= 10) {
      return 'display-2';
    } else return 'display-1';
  };
  return (
    <Themes theme={props.params?.Theme || 'B-HCA-Navy-Blue'}>
      <VideoHero
        title={
          <Text
            variation={
              props.params?.HeadingSize || getDynamicTitleStyle(titleLength)
            }
            tag={headingTag}
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
            <AppPlaceholder
              name={phKey}
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
        subtitle={
          props.fields?.data?.contextItem?.subHeading?.jsonValue?.value ? (
            <Text variation="subheading-1" tag={subheadingTag}>
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
