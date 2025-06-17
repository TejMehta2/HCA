import React from 'react';
import Text from '../../foundation/Text/Text';
import YextResultCardArticles from '../YextResultCardArticles/YextResultCardArticles';
import { CardProps } from '@yext/search-ui-react';
import shared from '../../types/yext/shared';
import Image from 'next/image';

const YextResultCardSharedAdaptor = (props: CardProps<shared>): JSX.Element => {
  const { result } = props;

  const { name, rawData } = result;
  const { c_body, c_uRL, c_primaryImage } = rawData;

  const image =
    name && c_primaryImage?.url
      ? {
          alt: name,
          src: c_primaryImage?.url,
          width: c_primaryImage?.width,
          height: c_primaryImage?.height,
        }
      : undefined;

  return (
    <YextResultCardArticles
      image={
        image ? (
          <>
            <Image {...image} />
          </>
        ) : undefined
      }
      title={
        <Text tag="h3" variation={'heading-1'}>
          {name}
        </Text>
      }
      copy={
        c_body ? (
          <Text tag="div" variation={'body-large'}>
            <span dangerouslySetInnerHTML={{ __html: c_body }} />
          </Text>
        ) : undefined
      }
      ctas={{
        button: (
          <a href={c_uRL}>
            Learn <b>more</b>
          </a>
        ),
      }}
    />
  );
};

export default YextResultCardSharedAdaptor;
