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
  console.log(props);

  const year = props.fields.data.contextItem.date.value.slice(0, 4);
  const month = props.fields.data.contextItem.date.value.slice(4, 6);
  const day = props.fields.data.contextItem.date.value.slice(6, 8);
  const hours = props.fields.data.contextItem.date.value.slice(9, 11);
  const minutes = props.fields.data.contextItem.date.value.slice(11, 13);
  const seconds = props.fields.data.contextItem.date.value.slice(13, 15);

  const fomattedDate = new Date(
    Date.UTC(+year, +month - 1, +day, +hours, +minutes, +seconds)
  );

  console.log(props.fields.data.contextItem.date.value);

  return (
    <HeaderBlogDetails
      theme={props.params.Theme}
      tag={
        <Tags contentVariation="quote">
          <a href="#">
            <JSSText
              field={
                props.fields.data.contextItem.tags.tagList[0].title.jsonValue
              }
            />
          </a>
        </Tags>
      }
      date={<time dateTime="Sept 7, 2023">Sept 7, 2023</time>}
      title={
        <Text
          tag={props.params.HeadingTag || 'h1'}
          variation={props.params.HeadingSize || 'display-1'}
        >
          <JSSText field={props.fields.data.contextItem.title.jsonValue} />
        </Text>
      }
    />
  );

  /* return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.data.contextItem.title.jsonValue} />
      <br />
      <RichText field={props.fields.data.contextItem.text.jsonValue} />
      <br />
      <Text field={props.fields.data.contextItem.date.jsonValue} />
      <br />
      <ul>
        {props.fields.data.contextItem.tags.tagList.map((tag, index) => (
          <li key={index}>
            <Text field={tag.title.jsonValue} />
            <br />
          </li>
        ))}
      </ul>
    </div>
  ); */
};
