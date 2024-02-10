import React from 'react';
import { Field, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type BlogTags = {
  title: { jsonValue: Field<string> };
};

interface Fields {
  data: {
    contextItem: {
      title: { jsonValue: Field<string> };
      text: { jsonValue: Field<string> };
      date: { jsonValue: Field<string> };
      tags: { tagList: BlogTags[] };
    };
  };
}

type BlogDetailsHeaderProps = {
  params: {
    [key: string]: string;
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
  );
};
