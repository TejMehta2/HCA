import React, { type JSX } from 'react';
import Text from '../../foundation/Text/Text';
import YextResultCardArticles from '../YextResultCardArticles/YextResultCardArticles';
import { CardProps } from '@yext/search-ui-react';

// Manually type, because there is not a corresponding type for links in generated Yext types.
export interface YextLink {
  index: number;
  description: string;
  link: string;
  name: string;
  source: string;
  rawData: {
    displayLink: string;
    htmlSnippet: string;
    htmlTitle: string;
    link: string;
  };
}
const YextResultCardLinksAdaptor = (
  props: CardProps<YextLink>
): JSX.Element => {
  const { result } = props;

  const { name, link, description } = result;

  return (
    <YextResultCardArticles
      title={
        <Text tag="h3" variation={'heading-1'}>
          {name}
        </Text>
      }
      copy={
        description ? (
          <Text tag="div" variation={'body-large'}>
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </Text>
        ) : undefined
      }
      ctas={{
        button: <a href={link}>{name}</a>,
      }}
    />
  );
};

export default YextResultCardLinksAdaptor;
