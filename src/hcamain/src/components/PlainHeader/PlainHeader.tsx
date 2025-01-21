import React from 'react';
import {
  Field,
  RichText,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import HeaderPlain from '@component-library/site-components/HeaderPlain/HeaderPlain';
import Params from 'src/types/params';
import Themes from '@component-library/foundation/Themes/Themes';

interface Fields {
  data?: {
    contextItem?: {
      subHeading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
    };
  };
}

type PlainHeaderProps = {
  params?: Params;
  fields?: Fields;
};

const PlainHeaderDefaultComponent = (props: PlainHeaderProps): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with text</span>
      </div>
    </div>
  );
};

export const Default = (props: PlainHeaderProps): JSX.Element => {
  if (!props.fields) {
    return <PlainHeaderDefaultComponent {...props} />;
  }
  const subheadingTag = props.params?.HeadingTag || 'h1';
  const headingTag = props.fields?.data?.contextItem?.subHeading?.jsonValue
    ?.value
    ? 'span'
    : subheadingTag;
  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <HeaderPlain
        subtitle={
          <Text tag={subheadingTag} variation="subheading-1">
            <JssText
              field={props.fields?.data?.contextItem?.subHeading?.jsonValue}
            />
          </Text>
        }
        heading={
          <Text
            tag={headingTag}
            variation={props.params?.HeadingSize || 'display-3'}
          >
            <JssText
              field={props.fields?.data?.contextItem?.title?.jsonValue}
            />
          </Text>
        }
        description={
          <RichText field={props.fields?.data?.contextItem?.text?.jsonValue} />
        }
      />
    </Themes>
  );
};
