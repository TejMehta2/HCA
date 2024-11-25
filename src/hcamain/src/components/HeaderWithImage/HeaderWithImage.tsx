import React from 'react';
import {
  Field,
  Placeholder,
  ComponentRendering,
  ImageField,
  RichText,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HeaderWithImage from '@component-library/site-components/HeaderWithImage/HeaderWithImage';
import Text from '@component-library/foundation/Text/Text';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import getSubheadingTag from 'lib/subheading-tag-getter';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

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

export type HeaderWithImageProps = {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

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

export const Default = (props: HeaderWithImageProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeaderWithImageDefaultComponent {...props} />;
  }
  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety
  return (
    <HeaderWithImage
      theme={props.params?.Theme || 'D-HCA-Teal'}
      title={
        <Text
          variation={props.params?.HeadingSize || 'display-1'}
          tag={props.params?.HeadingTag || 'h2'}
        >
          <JSSText field={props.fields?.data?.contextItem?.title?.jsonValue} />
        </Text>
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
      copy={
        <Text variation="body-large" tag="div">
          <RichText field={props.fields?.data?.contextItem?.text?.jsonValue} />
          <ul className="tick">
            <li>
              You’ll be given a local anaesthetic to numb your groin or wrist.
              You may also be given a sedative to help you relax.
            </li>
            <li>
              A small tube will be inserted into your artery. A catheter is then
              placed inside that tube.
            </li>
            <li>The balloon is inflated, which opens your artery.</li>
            <li>
              A stent, made of wire mesh, will be inserted to keep the artery
              open.
            </li>
            <li>
              The balloon and catheter are then removed, leaving the stent in
              position.
            </li>
          </ul>
          <ul>
            <li>
              You’ll be given a local anaesthetic to numb your groin or wrist.
              You may also be given a sedative to help you relax.
            </li>
            <li>
              A small tube will be inserted into your artery. A catheter is then
              placed inside that tube.
            </li>
            <li>The balloon is inflated, which opens your artery.</li>
            <li>
              A stent, made of wire mesh, will be inserted to keep the artery
              open.
            </li>
            <li>
              The balloon and catheter are then removed, leaving the stent in
              position.
            </li>
          </ul>
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
      ctas={
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
    />
  );
};
