import React from 'react';
import {
  Field,
  Image,
  ImageField,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import QuoteBlock from '@component-library/components/QuoteBlock/QuoteBlock';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';

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
  params: {
    [key: string]: string;
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
  };
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
    <BlogContent theme={props.params.Theme || 'F-HCA-White'}>
      <QuoteBlock
        author={{
          name: props.fields.Author[0].fields.Name.value,
          image: <Image field={props.fields.Author[0].fields.Avatar} />,
          tag: (
            <span>
              <JssText field={props.fields.Author[0].fields.Position} />
            </span>
          ),
        }}
        children={
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.Quote.value,
            }}
          ></span>
        }
      />
    </BlogContent>
  );
};
