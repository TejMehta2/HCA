import React from 'react';
import {
  Field,
  Image,
  ImageField,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import QuoteBlock from '@component-library/components/QuoteBlock/QuoteBlock';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import RichText from '@component-library/core-components/RichText/RichText';

interface AuthorFields {
  fields?: {
    Name?: Field<string>;
    Position?: Field<string>;
    Avatar?: ImageField;
  };
}

interface Fields {
  Quote?: Field<string>;
  Author?: AuthorFields[];
}

type BlogQuoteProps = {
  params?: Params;
  fields?: Fields;
};

const BlogQuoteDefaultComponent = (): JSX.Element => {
  return <></>;
};

export const Default = (props: BlogQuoteProps): JSX.Element => {
  if (!props.fields) {
    return <BlogQuoteDefaultComponent />;
  }

  const isContainerized = props?.params?.Containerized === '1';
  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles}>
        <figure>
          <QuoteBlock
            author={{
              name: <JssText field={props.fields?.Author?.[0].fields?.Name} />,
              image: (
                <Image field={props.fields?.Author?.[0]?.fields?.Avatar} />
              ),
              tag: (
                <span>
                  <JssText
                    field={props.fields?.Author?.[0]?.fields?.Position}
                  />
                </span>
              ),
            }}
            children={
              <Text variation={props.params?.HeadingSize || 'display-5'}>
                <JssText field={props.fields?.Quote} />
              </Text>
            }
          />
        </figure>
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      contentVariation="quote"
    >
      <RichText>
        <QuoteBlock
          author={{
            name: <JssText field={props.fields?.Author?.[0].fields?.Name} />,
            image: <Image field={props.fields?.Author?.[0]?.fields?.Avatar} />,
            tag: (
              <span>
                <JssText field={props.fields?.Author?.[0]?.fields?.Position} />
              </span>
            ),
          }}
          children={
            <Text variation={props.params?.HeadingSize || 'display-5'}>
              <JssText field={props.fields?.Quote} />
            </Text>
          }
        />
      </RichText>
    </BlogContent>
  );
};
