
import { Text as JssText } from '@sitecore-content-sdk/nextjs';
import QuoteBlock from '@component-library/components/QuoteBlock/QuoteBlock';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { AuthorFields } from 'src/types/authorFields';

export function MapAuthorsToBlockQuotes(props: AuthorFields[] | undefined) {
  if (!props) return undefined;
  return props.map((author, index) => {
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
}
