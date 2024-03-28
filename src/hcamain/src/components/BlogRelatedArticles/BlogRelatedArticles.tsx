import React from 'react';
import {
  GetStaticComponentProps,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  Image as JssImage,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
//import { ApiSearchProps } from 'src/types/searchProps';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import CardBlog from '@component-library/components/CardBlog/CardBlog';
import Tags from '@component-library/core-components/Tags/Tags';
import JssDate from '../../jss-abstractions/JssDate/JssDate';
import useSearchForm from '@component-library/hooks/useSearchForm/useSearchForm';
import { Autocomplete, BlogResponse } from '../BlogSearch/BlogSearch.types';
import { BlogRelatedArticlesProps } from './BlogRelatedArticles.types';
import Image from 'next/image';
import formatDate from 'src/jss-abstractions/JssDate/formatDate';
import getBaselineParams from 'lib/getBaselineParams';

const BASE_API_URL = `${process.env.NEXT_PUBLIC_DATALAYER_URL}/articles`;
const QUERY_STRING = 'serviceLineId';

const BlogRelatedArticlesDefaultComponent = (
  props: BlogRelatedArticlesProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">BlogRelatedArticles no datasource</span>
    </div>
  </div>
);

export const Default = (props: BlogRelatedArticlesProps): JSX.Element => {
  const { fields } = props;

  const { baselineParams } = getBaselineParams(props);

  const fallbackData = useComponentProps<BlogResponse>(props.rendering?.uid);

  const BASE_BLOG_URL =
    props.fields?.data?.item?.blogUrl?.jsonValue?.value.href;

  const serviceLineId =
    props.fields?.data?.contextItem?.category?.category[0].id || '';

  const { data } = useSearchForm<BlogResponse, Autocomplete>({
    baseUrl: BASE_API_URL,
    baselineParams: [
      ...baselineParams,
      ['verticalKey', 'articles'],
      [QUERY_STRING, serviceLineId],
    ],
    fallbackData: fallbackData,
  });

  if (!fields) {
    return <BlogRelatedArticlesDefaultComponent {...props} />;
  }

  let cardsList;

  if (props.fields?.data?.item?.articles?.ArticlesList?.length) {
    cardsList = props.fields.data.item.articles.ArticlesList.map(
      (card, index) => (
        <CardBlog key={index}>
          <JssImage field={card.abstractImage?.jsonValue} />
          <JssDate field={card.date?.jsonValue} />
          {card.abstractTitle && (
            <Text tag="h3" variation="heading-2">
              <a href={card.url?.path}>
                <JssText field={card.abstractTitle} />
              </a>
            </Text>
          )}
          <Text tag="span" variation="body-large">
            <JssRichText field={card.abstractText} />
          </Text>
          {!!card.articleType && (
            <Tags>
              <a
                href={`${BASE_BLOG_URL}?${QUERY_STRING}=${card.articleType?.targetItem?.id}`}
              >
                <JssText field={card.articleType?.targetItem?.title} />
              </a>
            </Tags>
          )}
        </CardBlog>
      )
    );
  } else if (data?.response?.results) {
    cardsList = data.response.results.map((card, index) => (
      <CardBlog key={index}>
        <Image
          src={card.data.imageUrl}
          alt={card.data.name}
          width="643"
          height="605"
        />
        <time>{formatDate(new Date(card.data.date))}</time>
        {card.data.title && (
          <Text tag="h3" variation="heading-2">
            <a href={card.data.url}>{card.data.title}</a>
          </Text>
        )}
        <Text tag="span" variation="body-large">
          {card.data.description}
        </Text>
        {!!card.data.typeName && (
          <Tags>
            <a href={`${BASE_BLOG_URL}?${QUERY_STRING}=${card.data.typeId}`}>
              {card.data.typeName}
            </a>
          </Tags>
        )}
      </CardBlog>
    ));
  }

  return (
    <CarouselCards
      title={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-5'}
        >
          <JssText field={props?.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      link={
        props.fields?.data?.item?.blogUrl?.jsonValue?.value && (
          <Button size={'large'} variation={'full'}>
            <JssLink
              field={props.fields?.data?.item?.blogUrl?.jsonValue?.value}
            >
              {props.fields?.data?.item?.cTALink?.jsonValue?.value?.text && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.data?.item?.cTALink?.jsonValue?.value?.text,
                  }}
                ></span>
              )}
            </JssLink>
          </Button>
        )
      }
      theme={props.params?.Theme || 'A-HCA-White'}
    >
      {cardsList}
    </CarouselCards>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async (
  rendering: BlogRelatedArticlesProps
) => {
  const serviceLineId =
    rendering.fields?.data?.contextItem?.category?.category[0].id || '';

  const { baselineParams } = getBaselineParams(rendering);
  const params = [
    ...baselineParams,
    ['verticalKey', 'articles'],
    [QUERY_STRING, serviceLineId],
  ].map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings
  const query = `?${params.join('&')}`;
  const url = new URL(query, BASE_API_URL + '/search'); // compose API url

  try {
    const response = await fetch(url.href);
    if (response.ok) {
      const fallbackData = await response.json();
      return fallbackData;
    } else {
      throw response.statusText;
    }
  } catch (error) {
    console.error(error);
    return rendering;
  }
};
