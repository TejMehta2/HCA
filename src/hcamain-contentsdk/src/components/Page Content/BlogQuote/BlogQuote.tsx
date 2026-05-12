/* eslint-disable prettier/prettier */
import React, { type JSX } from 'react';
import {
  Field,
  Image,
  Text as JssText,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import QuoteBlock from '@component-library/components/QuoteBlock/QuoteBlock';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import RichText from '@component-library/core-components/RichText/RichText';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import { AuthorFields } from 'src/types/authorFields';
import { ComponentWithContextProps } from 'lib/component-props';
import { isInsideContainerComponent } from 'lib/utility-functions/insideContainerComponent';

interface Fields {
  Quote?: Field<string>;
  Author?: AuthorFields[];
  Link?: LinkField;
}

type BlogQuoteProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  alignment?: 'center';
};

const BlogQuoteDefaultComponent = (props: BlogQuoteProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

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

const BlogQuoteContent = ({
  props,
  alignment,
  showQuotationMarks,
}: {
  props: BlogQuoteProps;
  alignment?: 'center';
  showQuotationMarks: boolean;
}): JSX.Element => {
  const author = props.fields?.Author?.[0];
  const authorHref = author?.fields?.Link?.value?.href;
  const hasAuthorLink = Boolean(authorHref);
  const quote = props.fields?.Quote;
  const hasQuote = Boolean(quote?.value);

  const authorName = <JssText field={author?.fields?.Name} />;
  const authorImage = (
    <NextJssImage
      field={author?.fields?.Avatar}
      next={{
        width: '70',
        height: '70',
      }}
    />
  );
  const authorTag = (
    <span>
      <JssText field={author?.fields?.Position} />
    </span>
  );

  return (
    <RichText>
      <QuoteBlock
        alignment={alignment}
        author={
          author
            ? {
                name: hasAuthorLink ? (
                  <a href={authorHref} target="_blank">
                    {authorName}
                  </a>
                ) : (
                  authorName
                ),
                image: hasAuthorLink ? (
                  <a href={authorHref} target="_blank">
                    {authorImage}
                  </a>
                ) : (
                  authorImage
                ),
                tag: hasAuthorLink ? (
                  <a href={authorHref} target="_blank">
                    {authorTag}
                  </a>
                ) : (
                  authorTag
                ),
              }
            : undefined
        }
      >
        {hasQuote ? (
          <Text variation={props.params?.HeadingSize || 'display-3'}>
            {showQuotationMarks ? '“' : null}
            <JssText field={quote} />
            {showQuotationMarks ? '”' : null}
          </Text>
        ) : null}
      </QuoteBlock>
    </RichText>
  );
};

export const Default = (props: BlogQuoteProps): JSX.Element => {
  const { alignment } = props;
  if (!props.fields) {
    return <BlogQuoteDefaultComponent {...props} />;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      contentVariation={alignment ? `quote-${alignment}` : 'quote'}
      id={componentAnchorId}
      isInsideContainer={isInsideContainerComponent(props.params)}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
    >
      <BlogQuoteContent
        props={props}
        alignment={alignment}
        showQuotationMarks={true}
      />
    </BlogContent>
  );
};

export const NoQuotationMarks = (props: BlogQuoteProps): JSX.Element => {
  if (!props.fields) {
    return <BlogQuoteDefaultComponent {...props} />;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      id={componentAnchorId}
      isInsideContainer={isInsideContainerComponent(props.params)}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
    >
      <BlogQuoteContent props={props} showQuotationMarks={false} />
    </BlogContent>
  );
};

export const Center = (props: BlogQuoteProps) => (
  <Default {...props} alignment="center" />
);
