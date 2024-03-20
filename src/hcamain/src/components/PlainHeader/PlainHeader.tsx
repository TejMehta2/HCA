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
    currentItem?: {
      heading?: { jsonValue?: Field<string> };
    };
    contextItem?: {
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

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <HeaderPlain
        subheading={
          <Text variation="subheading-1">
            <JssText
              field={props.fields?.data?.currentItem?.heading?.jsonValue}
            />
          </Text>
        }
        heading={
          <Text
            tag={props.params?.HeadingTag || 'h1'}
            variation={props.params?.HeadingSize || 'display-1'}
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
