import React from 'react';
import {
  Field,
  Image,
  ImageField,
  Text as JssText,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import QuoteBlock from '@component-library/components/QuoteBlock/QuoteBlock';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import RichText from '@component-library/core-components/RichText/RichText';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

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
  Link?: LinkField;
}

type BlogQuoteProps = {
  params?: Params;
  fields?: Fields;
};

const BlogQuoteDefaultComponent = (props: BlogQuoteProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (isExperienceEditor)
    return (
      <>
        <JssText field={props.fields?.Author?.[0]?.fields?.Name} />
        <Image field={props.fields?.Author?.[0]?.fields?.Avatar} />
        <JssText field={props.fields?.Author?.[0]?.fields?.Position} />
        <JssText field={props.fields?.Quote} />
      </>
    );

  return <></>;
};

export const Default = (props: BlogQuoteProps): JSX.Element => {
  if (!props.fields) {
    return <BlogQuoteDefaultComponent {...props} />;
  }

  const quoteBlock = (
    <QuoteBlock
      author={
        props.fields?.Author?.length
          ? {
              name: <JssText field={props.fields?.Author?.[0]?.fields?.Name} />,
              image: (
                <NextJssImage
                  field={props.fields?.Author?.[0]?.fields?.Avatar}
                  next={{
                    width: '70',
                    height: '70',
                  }}
                />
              ),
              tag: (
                <span>
                  <JssText
                    field={props.fields?.Author?.[0]?.fields?.Position}
                  />
                </span>
              ),
            }
          : undefined
      }
      children={
        <Text variation={props.params?.HeadingSize || 'display-5'}>
          “<JssText field={props.fields?.Quote} />”
        </Text>
      }
    />
  );

  const isContainerized = props?.params?.Containerized === '1';
  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles}>
        <figure>{quoteBlock}</figure>
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      contentVariation="quote"
    >
      <RichText>{quoteBlock}</RichText>
    </BlogContent>
  );
};

export const NoQuotationMarks = (props: BlogQuoteProps): JSX.Element => {
  if (!props.fields) {
    return <BlogQuoteDefaultComponent {...props} />;
  }

  const quoteBlock = (
    <QuoteBlock
      author={
        props.fields?.Author?.length
          ? {
              name: props?.fields?.Link ? (
                <a href={props?.fields?.Link?.value?.href} target="_blank">
                  <JssText field={props.fields?.Author?.[0]?.fields?.Name} />
                </a>
              ) : (
                <JssText field={props.fields?.Author?.[0]?.fields?.Name} />
              ),
              image: props?.fields?.Link ? (
                <a href={props?.fields?.Link?.value?.href} target="_blank">
                  <NextJssImage
                    field={props.fields?.Author?.[0]?.fields?.Avatar}
                    next={{
                      width: '70',
                      height: '70',
                    }}
                  />
                </a>
              ) : (
                <NextJssImage
                  field={props.fields?.Author?.[0]?.fields?.Avatar}
                  next={{
                    width: '70',
                    height: '70',
                  }}
                />
              ),
              tag: props?.fields?.Link ? (
                <a href={props?.fields?.Link?.value?.href} target="_blank">
                  <span>
                    <JssText
                      field={props.fields?.Author?.[0]?.fields?.Position}
                    />
                  </span>
                </a>
              ) : (
                <span>
                  <JssText
                    field={props.fields?.Author?.[0]?.fields?.Position}
                  />
                </span>
              ),
            }
          : undefined
      }
    />
  );

  const isContainerized = props?.params?.Containerized === '1';
  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles}>
        <figure>{quoteBlock}</figure>
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      contentVariation="quote"
    >
      <RichText>{quoteBlock}</RichText>
    </BlogContent>
  );
};
