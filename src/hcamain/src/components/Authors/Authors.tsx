/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import QuoteBlock from '@component-library/components/QuoteBlock/QuoteBlock';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Text from '@component-library/foundation/Text/Text';
import Container from '@component-library/foundation/Containers/Container';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';

interface AuthorFields {
  fields?: {
    Name?: Field<string>;
    Position?: Field<string>;
    Avatar?: ImageField;
    Link?: LinkField;
    PositionLink?: LinkField;
  };
}

interface Fields {
  Title?: Field<string>;
  Authors?: AuthorFields[];
}

type AuthorsProps = {
  params?: Params;
  fields?: Fields;
};

const AuthorsDefaultComponent = (props: AuthorsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Authors Block. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: AuthorsProps): JSX.Element => {
  if (!props.fields?.Authors || !props.fields?.Authors.length) {
    return <AuthorsDefaultComponent {...props} />;
  }

  const quoteBlocks = props.fields.Authors.map((author, index) => {
    const authorLink = author?.fields?.Link?.value?.href;
    const positionLink = author?.fields?.PositionLink?.value?.href;
    const tagLink = positionLink || authorLink;

    const name = authorLink ? (
      <a href={authorLink} target="_blank">
        <JssText field={author?.fields?.Name} />
      </a>
    ) : (
      <JssText field={author?.fields?.Name} />
    );

    const image = authorLink ? (
      <a href={authorLink} target="_blank">
        <NextJssImage
          field={author?.fields?.Avatar}
          next={{ width: '70', height: '70' }}
        />
      </a>
    ) : (
      <NextJssImage
        field={author?.fields?.Avatar}
        next={{ width: '70', height: '70' }}
      />
    );

    const tag = tagLink ? (
      <a href={tagLink} target="_blank">
        <span>
          <JssText field={author?.fields?.Position} />
        </span>
      </a>
    ) : (
      <span>
        <JssText field={author?.fields?.Position} />
      </span>
    );

    return <QuoteBlock key={`author-${index}`} author={{ name, image, tag }} />;
  });

  const componentTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    componentTitle
  );

  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const isContainerized = props?.params?.Containerized === '1';

  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles} id={componentAnchorId}>
        <figure>{quoteBlocks}</figure>
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      contentVariation="quote"
      id={componentAnchorId}
      {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
    >
      {props?.fields?.Title && (
        <Container marginBottom="spacing-4">
          <Text tag="div" variation={'subheading-1'}>
            <JssText field={props?.fields?.Title} />
          </Text>
        </Container>
      )}
      <RichText>{quoteBlocks}</RichText>
    </BlogContent>
  );
};
