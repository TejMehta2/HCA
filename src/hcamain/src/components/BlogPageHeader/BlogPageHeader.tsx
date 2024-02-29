import React from 'react';
import {
  Field,
  RichText,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import HeaderPlain from '@component-library/site-components/HeaderPlain/HeaderPlain';
import Params from 'src/types/params';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
}

type BlogPageHeaderProps = {
  params?: Params;
  fields?: Fields;
};

const BlogPageHeaderDefaultComponent = (
  props: BlogPageHeaderProps
): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with image no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: BlogPageHeaderProps): JSX.Element => {
  if (!props.fields) {
    return <BlogPageHeaderDefaultComponent {...props} />;
  }
  return (
    <HeaderPlain
      theme={props.params?.Theme || 'A-HCA-White'}
      subheading={
        <Text variation="subheading-1">
          <JssText field={props.fields?.Heading} />
        </Text>
      }
      heading={
        <Text
          tag={props.params?.HeadingTag || 'h1'}
          variation={props.params?.HeadingSize || 'display-1'}
        >
          <JssText field={props.fields?.Title} />
        </Text>
      }
    >
      <RichText field={props.fields?.Text} />
    </HeaderPlain>
  );
};
