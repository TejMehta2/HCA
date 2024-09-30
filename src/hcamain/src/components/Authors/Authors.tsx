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

interface AuthorFields {
  fields?: {
    Name?: Field<string>;
    Position?: Field<string>;
    Avatar?: ImageField;
    Link?: LinkField;
  };
}

interface Fields {
  Title?: Field<string>;
  Authors?: AuthorFields[][];
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

  console.log('authors', props);

  const quoteBlocks = props.fields?.Authors.flatMap((authorArray, index) =>
    authorArray.map((author, authorIndex) => (
      <QuoteBlock
        key={`author-${index}-${authorIndex}`}
        author={
          author?.fields?.Link?.value?.href
            ? {
                name: (
                  <a href={author?.fields?.Link?.value?.href} target="_blank">
                    <JssText field={author?.fields?.Name} />
                  </a>
                ),
                image: (
                  <a href={author?.fields?.Link?.value?.href} target="_blank">
                    <NextJssImage
                      field={author?.fields?.Avatar}
                      next={{ width: '70', height: '70' }}
                    />
                  </a>
                ),
                tag: (
                  <a href={author?.fields?.Link?.value?.href} target="_blank">
                    <span>
                      <JssText field={author?.fields?.Position} />
                    </span>
                  </a>
                ),
              }
            : {
                name: <JssText field={author?.fields?.Name} />,
                image: (
                  <NextJssImage
                    field={author?.fields?.Avatar}
                    next={{ width: '70', height: '70' }}
                  />
                ),
                tag: (
                  <span>
                    <JssText field={author?.fields?.Position} />
                  </span>
                ),
              }
        }
      />
    ))
  );

  const isContainerized = props?.params?.Containerized === '1';

  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles}>
        <figure>{quoteBlocks}</figure>
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      contentVariation="quote"
    >
      <RichText>{quoteBlocks}</RichText>
    </BlogContent>
  );
};
