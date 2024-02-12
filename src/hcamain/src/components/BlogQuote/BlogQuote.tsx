import React from 'react';
import {
  Field,
  Text,
  Image,
  ImageField,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface AuthorFields {
  fields: {
    Name: Field<string>;
    Position: Field<string>;
    Avatar: ImageField;
  };
}

interface Fields {
  Quote: Field<string>;
  Author: AuthorFields[];
}

type BlogQuoteProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BlogQuoteDefaultComponent = (props: BlogQuoteProps): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with image no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: BlogQuoteProps): JSX.Element => {
  if (!props.fields) {
    return <BlogQuoteDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Quote} />
      <br />
      <ul>
        {props.fields.Author.map((author, index) => (
          <li key={index}>
            <br />
            <JssText field={author.fields.Name} />
            <br />
            <JssText field={author.fields.Position} />
            <Image field={author.fields.Avatar} />
            <br />
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
