import React from 'react';
import {
  Field,
  Placeholder,
  ComponentRendering,
  ImageField,
  RichText,
  Text as JSSText,
  Image as JSSImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HeaderWithImage from '@component-library/site-components/HeaderWithImage/HeaderWithImage';
import Text from '@component-library/foundation/Text/Text';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
}

type HeaderWithImageProps = {
  params: {
    [key: string]: string;
    Theme: Theme;
    /* TODO themes from BE to only take specific theme types
    | 'A-HCA-Main-Turquoise'
    | 'B-HCA-Green'
    | 'C-HCA-Beige'
    | 'D-HCA-Light-Orange'
    | 'E-HCA-Dark-Grey'
    | 'G-HCA-Green-40'
    | 'H-HCA-Green-20'
   */
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
    styles: string;
  };
  rendering: ComponentRendering;
  fields: Fields;
};

const HeaderWithImageDefaultComponent = (
  props: HeaderWithImageProps
): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with image no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: HeaderWithImageProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeaderWithImageDefaultComponent {...props} />;
  }
  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety
  return (
    <HeaderWithImage
      theme={props.params.Theme || 'A-HCA-Main-Turquoise'}
      title={
        <Text
          variation={props.params.HeadingSize || 'display-1'}
          tag={props.params.HeadingTag || 'h2'}
        >
          <JSSText field={props.fields.Title} />
        </Text>
      }
      copy={
        <Text variation="body-large" tag="div">
          <RichText field={props.fields.Text} />
        </Text>
      }
      image={<JSSImage field={props.fields.Image} />}
      ctas={
        <Placeholder
          name={phKey}
          rendering={props.rendering}
          size={buttonSize}
          contentVariation="full-width"
        />
      }
    />
  );
};
