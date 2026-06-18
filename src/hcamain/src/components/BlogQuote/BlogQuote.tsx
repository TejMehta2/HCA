/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  Image,
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
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import { AuthorFields } from 'src/types/authorFields';

interface Fields {
  Quote?: Field<string>;
  Author?: AuthorFields[];
  Link?: LinkField;
}

type BlogQuoteProps = {
  params?: Params;
  fields?: Fields;
  alignment?: 'center';
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
  const { alignment } = props;
  if (!props.fields) {
    return <BlogQuoteDefaultComponent {...props} />;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const quoteBlock = (
    <QuoteBlock
      alignment={alignment}
      author={
        props.fields?.Author?.length
          ? {
              name:
                props.fields?.Author?.[0]?.fields?.Link &&
                props.fields?.Author?.[0]?.fields?.Link?.value?.href !== '' ? (
                  <a
                    href={props.fields?.Author?.[0]?.fields?.Link?.value?.href}
                    target="_blank"
                  >
                    <JssText field={props.fields?.Author?.[0]?.fields?.Name} />
                  </a>
                ) : (
                  <JssText field={props.fields?.Author?.[0]?.fields?.Name} />
                ),
              image:
                props.fields?.Author?.[0]?.fields?.Link &&
                props.fields?.Author?.[0]?.fields?.Link?.value?.href !== '' ? (
                  <a
                    href={props.fields?.Author?.[0]?.fields?.Link?.value?.href}
                    target="_blank"
                  >
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
              tag:
                props.fields?.Author?.[0]?.fields?.Link &&
                props.fields?.Author?.[0]?.fields?.Link?.value?.href !== '' ? (
                  <a
                    href={props.fields?.Author?.[0]?.fields?.Link?.value?.href}
                    target="_blank"
                  >
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
      children={
        props.fields?.Quote && props.fields?.Quote?.value !== '' ? ( // Check if the quote is not null or empty
          <Text variation={props.params?.HeadingSize || 'display-3'}>
            “<JssText field={props.fields?.Quote} />”
          </Text>
        ) : null // Render nothing if the quote is null or empty
      }
    />
  );

  const isContainerized = props?.params?.Containerized === '1';
  if (isContainerized) {
    return (
      <RichText
        additionalStyles={props?.params?.styles}
        id={componentAnchorId}
        {...(tableOfContentTitle &&
        props?.params?.ExcludeFromTableOfContents !== '1'
          ? { tableOfContentTitle: tableOfContentTitle }
          : {})}
      >
        <figure>{quoteBlock}</figure>
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      contentVariation={alignment ? `quote-${alignment}` : 'quote'}
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
    >
      <RichText>{quoteBlock}</RichText>
    </BlogContent>
  );
};

export const NoQuotationMarks = (props: BlogQuoteProps): JSX.Element => {
  if (!props.fields) {
    return <BlogQuoteDefaultComponent {...props} />;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;
  const quoteBlock = (
    <QuoteBlock
      author={
        props.fields?.Author?.length
          ? {
              name:
                props.fields?.Author?.[0]?.fields?.Link &&
                props.fields?.Author?.[0]?.fields?.Link?.value?.href !== '' ? (
                  <a
                    href={props.fields?.Author?.[0]?.fields?.Link?.value?.href}
                    target="_blank"
                  >
                    <JssText field={props.fields?.Author?.[0]?.fields?.Name} />
                  </a>
                ) : (
                  <JssText field={props.fields?.Author?.[0]?.fields?.Name} />
                ),
              image:
                props.fields?.Author?.[0]?.fields?.Link &&
                props.fields?.Author?.[0]?.fields?.Link?.value?.href !== '' ? (
                  <a
                    href={props.fields?.Author?.[0]?.fields?.Link?.value?.href}
                    target="_blank"
                  >
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
              tag:
                props.fields?.Author?.[0]?.fields?.Link &&
                props.fields?.Author?.[0]?.fields?.Link?.value?.href !== '' ? (
                  <a
                    href={props.fields?.Author?.[0]?.fields?.Link?.value?.href}
                    target="_blank"
                  >
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
      children={
        props.fields?.Quote && props.fields?.Quote?.value !== '' ? ( // Check if the text is not null or empty
          <Text variation={props.params?.HeadingSize || 'display-3'}>
            <JssText field={props.fields?.Quote} />
          </Text>
        ) : null // Render nothing if the quote is null or empty
      }
    />
  );

  const isContainerized = props?.params?.Containerized === '1';
  if (isContainerized) {
    return (
      <RichText
        additionalStyles={props?.params?.styles}
        id={componentAnchorId}
        {...(tableOfContentTitle &&
        props?.params?.ExcludeFromTableOfContents !== '1'
          ? { tableOfContentTitle: tableOfContentTitle }
          : {})}
      >
        <figure>{quoteBlock}</figure>
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
    >
      <RichText>{quoteBlock}</RichText>
    </BlogContent>
  );
};

export const Center = (props: BlogQuoteProps) => (
  <Default {...props} alignment="center" />
);
