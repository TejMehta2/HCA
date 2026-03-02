import React from 'react';
import { Text as JssText } from '@sitecore-jss/sitecore-jss-nextjs';
import QuoteBlock from '@component-library/components/QuoteBlock/QuoteBlock';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { AuthorFields } from 'src/types/authorFields.GraphQL';

export function MapAuthorsToBlockQuotes(props: AuthorFields[] | undefined) {
  if (!props) return undefined;

  return props.map((author, index) => {
    const authorLink = author?.link?.jsonValue?.value?.href;
    const positionLink = author?.positionLink?.jsonValue?.value?.href;
    const tagLink = positionLink || authorLink;

    const name = authorLink ? (
      <a href={authorLink} target="_blank">
        <JssText field={author?.name?.jsonValue} editable={false} />
      </a>
    ) : (
      <JssText field={author?.name?.jsonValue} editable={false} />
    );

    const image = authorLink ? (
      <a href={authorLink} target="_blank">
        <NextJssImage
          editable={false}
          field={author?.avatar?.jsonValue}
          next={{ width: '70', height: '70' }}
        />
      </a>
    ) : (
      <NextJssImage
        editable={false}
        field={author?.avatar?.jsonValue}
        next={{ width: '70', height: '70' }}
      />
    );

    const tag = tagLink ? (
      <a href={tagLink} target="_blank">
        <span>
          <JssText field={author?.position?.jsonValue} editable={false} />
        </span>
      </a>
    ) : (
      <span>
        <JssText field={author?.position?.jsonValue} editable={false} />
      </span>
    );

    return <QuoteBlock key={`author-${index}`} author={{ name, image, tag }} />;
  });
}
