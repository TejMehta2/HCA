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
//import Button from '@component-library/core-components/Button/Button';

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
}

type HeaderWithImageProps = {
  params: { [key: string]: string };
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
  /* const ctas = props.rendering.placeholders!['cta-buttons-1'].map(
    (cta, index) => {
      return (
        <Button key={index} size="large" theme="full">
          <a href={cta.fields.CTALink.value.href}>
            <Icons iconName="iconStethoscope" />
            <span>{cta.fields.CTALink.value.text}</span>
          </a>
        </Button>
      );
    }
  ); */
  console.log(props);
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeaderWithImageDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <HeaderWithImage
        theme="a"
        title={
          <Text variation="display-1" tag="h2">
            <JSSText field={props.fields.Title} />
          </Text>
        }
        copy={
          <Text variation="body-large" tag="span">
            <RichText tag="p" field={props.fields.Text} />
          </Text>
        }
        image={<JSSImage field={props.fields.Image} />}
        ctas={<Placeholder name={phKey} rendering={props.rendering} />}
      />
    </div>
  );
};
/* <JSSText field={props.fields.Title} />
      <RichText field={props.fields.Text} />
      <JSSImage field={props.fields.Image} />
      <Placeholder name={phKey} rendering={props.rendering} /> */
