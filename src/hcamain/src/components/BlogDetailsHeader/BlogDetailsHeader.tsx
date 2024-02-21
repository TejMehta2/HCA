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
import Link from 'next/link';
import JssDate from 'src/jss-abstractions/JssDate/JssDate';

type ArticleTypeFields = {
  title: { value: string };
};

interface Fields {
  data: {
    contextItem: {
      title: { jsonValue: Field<string> };
      text: { jsonValue: Field<string> };
      date: { jsonValue: Field<string> };
      articleType: { targetItem: ArticleTypeFields };
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

  return (
    <HeaderBlogDetails
      theme={props.params.Theme}
      tag={
        <>
          <Tags contentVariation="quote">
            <Link href={{ pathname: '/' }}>
              <JSSText
                field={
                  props.fields.data.contextItem.articleType.targetItem.title
                }
              />
            </Link>
          </Tags>
        </>
      }
      date={<JssDate field={props.fields.data.contextItem.date.jsonValue} />}
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
