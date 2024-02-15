import React from 'react';
import {
  Field,
  RichText,
  Text as JSSText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HeaderBlogDetails from '@component-library/site-components/HeaderBlogDetails/HeaderBlogDetails';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import Tags from '@component-library/core-components/Tags/Tags';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

type BlogTags = {
  title: { jsonValue: Field<string> };
};

interface Fields {
  data: {
    contextItem: {
      title: { jsonValue: Field<string> };
      text: { jsonValue: Field<string> };
      date: { value: string };
      tags: { tagList: BlogTags[] };
    };
  };
}

type BlogDetailsHeaderProps = {
  params: {
    [key: string]: string;
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
  };
  fields: Fields;
};

const BlogDetailsHeaderDefaultComponent = (
  props: BlogDetailsHeaderProps
): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with text</span>
      </div>
    </div>
  );
};

export const Default = (props: BlogDetailsHeaderProps): JSX.Element => {
  if (!props.fields) {
    return <BlogDetailsHeaderDefaultComponent {...props} />;
  }

  const parsedDate = parseISO(props.fields.data.contextItem.date.value);
  const formattedDate = format(parsedDate, 'MMM d, yyyy');

  return (
    <HeaderBlogDetails
      theme={props.params.Theme || 'F-HCA-White'}
      tag={
        <Tags contentVariation="quote">
          {/* TODO link for tag blog filter. Piotr to add url to global settings and filter parameter will be set in FE */}
          <Link href="#">
            <JSSText
              field={
                props.fields.data.contextItem.tags.tagList[0].title.jsonValue
              }
            />
          </Link>
        </Tags>
      }
      date={<time dateTime={formattedDate}>{formattedDate}</time>}
      title={
        <Text
          tag={props.params.HeadingTag || 'h1'}
          variation={props.params.HeadingSize || 'display-1'}
        >
          <JSSText field={props.fields.data.contextItem.title.jsonValue} />
        </Text>
      }
      bodyCopy={
        <Text tag="div" variation="body-large">
          <RichText field={props.fields.data.contextItem.text.jsonValue} />
        </Text>
      }
    />
  );
};
