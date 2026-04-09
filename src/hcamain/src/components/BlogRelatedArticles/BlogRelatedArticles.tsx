/* eslint-disable prettier/prettier */
import React from 'react';
import {
  GetStaticComponentProps,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  useComponentProps,
  useSitecoreContext,
  debug,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import CardBlog from '@component-library/components/CardBlog/CardBlog';
import Tags from '@component-library/core-components/Tags/Tags';
import JssDate from '../../jss-abstractions/JssDate/JssDate';
import JssTextWithEntityName from '../../jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';
import {
  BlogRelatedArticlesProps,
  BlogRelatedArticlesResult,
  StaticProps,
} from './BlogRelatedArticles.types';
import formatDate from 'src/jss-abstractions/JssDate/formatDate';
import getSubheadingTag from 'lib/subheading-tag-getter';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Image from 'next/image';
import parse from 'html-react-parser';
import ImageUrl from 'src/jss-abstractions/ImageUrl';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';
import { upsertQuerystringParam } from 'lib/utility-functions/addThumbnailParameter';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}/articles`;
const SEARCH_PATH = '/search';

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
  const { sitecoreContext } = useSitecoreContext();

  const isExperienceEditor = sitecoreContext?.pageEditing;
  const data = useComponentProps<StaticProps>(props.rendering?.uid);
  const quantity =
    Number(props?.fields?.data?.item?.numberOfCards?.jsonValue?.value) || 3;

  const ctaQuery = data?.ctaQuery;
  const baseBlogUrl = props.fields?.data?.item?.blogUrl?.jsonValue?.value.href;
  const queryString = 'articleTypeId';
  const context = useSitecoreContext();
  const currentArticleId = context.sitecoreContext?.route?.itemId?.toString();
  const formattedCurrentArticleId =
    currentArticleId && currentArticleId.replace(/[-{}]/g, '').toLowerCase();

  const relatedArticlesDisplayed = data?.BlogRelatedArticles?.reduce(
    (acc, curr) => {
      if (acc?.length >= quantity || curr?.pageId === formattedCurrentArticleId)
        return acc;
      return [...acc, curr];
    },
    []
  );

  if (!props.fields?.data?.item) {
    return <BlogRelatedArticlesDefaultComponent {...props} />;
  }

  let cardsList: JSX.Element[] = [];

  if (props.fields?.data?.item?.articles?.ArticlesList?.length) {
    cardsList = props.fields.data.item.articles.ArticlesList.map(
      (card, index) => {
        return (
          <CardBlog key={index}>
            {card.abstractImage?.jsonValue?.value?.src ? (
              <NextJssImage
                field={card.abstractImage?.jsonValue}
                editable={false}
                next={{
                  width: 500,
                  height: 400,
                  quality: 90,
                  sizes: '(max-width: 768px) 100vw, 30vw',
                }}
              />
            ) : (
              <NextJssImage
                field={card.image?.jsonValue}
                editable={false}
                next={{
                  width: 500,
                  height: 400,
                  quality: 90,
                  sizes: '(max-width: 768px) 100vw, 30vw',
                }}
              />
            )}

            <JssDate field={card.date?.jsonValue} editable={false} />
            {(card.abstractTitle?.value || card.title?.value) && (
              <Text
                tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
                variation="heading-2"
              >
                <a href={card.url?.path}>
                  {card.abstractTitle?.value ? (
                    <JssText field={card.abstractTitle} />
                  ) : (
                    <JssText field={card.title} />
                  )}
                </a>
              </Text>
            )}
            <Text tag="div" variation="body-large">
              {card.abstractText?.value ? (
                <JssRichText field={card.abstractText} />
              ) : (
                <JssRichText field={card.text} />
              )}
            </Text>
            <div>
              {!!card.articleType && (
                <Tags>
                  <JssText
                    tag="span"
                    field={card.articleType?.targetItem?.title}
                  />
                </Tags>
              )}
            </div>
          </CardBlog>
        );
      }
    );
  } else if (relatedArticlesDisplayed) {
    cardsList = relatedArticlesDisplayed.map(
      (
        {
          imageUrl,
          name,
          date,
          url,
          abstractTitle,
          abstractText,
          title,
          description,
          typeName,
          typeId,
          abstractImageUrl,
          primaryImageUrl,
        },
        index
      ) => {
        const cardImageSrc = ImageUrl(
          abstractImageUrl,
          primaryImageUrl,
          imageUrl
        );
        return (
          <CardBlog key={index}>
            {cardImageSrc !== undefined ? (
              <Image
                src={upsertQuerystringParam(cardImageSrc, 't', 'w750')}
                alt={name}
                width="643"
                height="605"
                quality={90}
              />
            ) : undefined}

            <time>{formatDate(new Date(date))}</time>
            {title && (
              <Text
                tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
                variation="heading-2"
              >
                <a href={`${url}`}>{abstractTitle ? abstractTitle : title}</a>
              </Text>
            )}
            <Text tag="div" variation="body-large">
              {parse(abstractText || description || '')}
            </Text>

            <div>
              {typeId && typeName && (
                <Tags>
                  <a href={`${baseBlogUrl}?${queryString}=${typeId}`}>
                    {typeName}
                  </a>
                </Tags>
              )}
            </div>
          </CardBlog>
        );
      }
    );
  }

  if (!cardsList?.length && !isExperienceEditor) {
    return <></>;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    props?.fields?.Title?.value
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || props?.fields?.Title?.value;

  const href = props.fields?.data?.item?.cTALink?.jsonValue?.value?.href;

  const viewAllCta = href
    ? props.fields?.data?.item?.articles?.ArticlesList?.length
      ? href
      : `${href}${ctaQuery}`
    : undefined;

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props?.fields?.data?.item?.heading?.jsonValue?.value
  );
  return (
    <CarouselCards
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      title={
        <Text
          tag={headingTag}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JssTextWithEntityName
            field={props?.fields?.data?.item?.title?.jsonValue}
          />
        </Text>
      }
      bodyCopy={
        props?.fields?.data?.item?.text?.jsonValue?.value ? (
          <JssRichText field={props?.fields?.data?.item?.text?.jsonValue} />
        ) : undefined
      }
      subtitle={
        props?.fields?.data?.item?.heading?.jsonValue?.value ? (
          <Text tag={subheadingTag} variation={'subheading-1'}>
            <JssText field={props?.fields?.data?.item?.heading?.jsonValue} />
          </Text>
        ) : undefined
      }
      link={
        !isExperienceEditor ? (
          viewAllCta ? (
            <Button size={'large'} variation={'full'}>
              <a href={viewAllCta}>
                <SitecoreSvg>
                  {props?.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value}
                </SitecoreSvg>

                <>
                  <JssRichText
                    field={{
                      value:
                        props.fields?.data?.item?.cTALink?.jsonValue?.value
                          ?.text || '',
                    }}
                  />
                </>
              </a>
            </Button>
          ) : (
            <></>
          )
        ) : props.fields.data.item.cTALink?.jsonValue ? (
          <JssLink field={props.fields.data.item.cTALink?.jsonValue}></JssLink>
        ) : (
          <></>
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
  const fields = rendering.fields?.data?.item;

  debug.common(
    'BlogRelatedArticlesProps: rendering.fields?.data',
    rendering.fields?.data
  );

  // Format props into entries, then query params
  const customFilters =
    (fields?.filterBy?.FilterByList &&
      fields?.filterBy?.FilterByList.map((item) => [
        item.filter?.value,
        item.filterValueGuid?.targetItem?.id
          .replaceAll(/[{},\-]/g, '')
          .toLowerCase(),
      ])) ||
    [];

  const contextSearchParams = Object.entries(
    rendering.fields?.data?.contextItemSearchParams || {}
  ).flatMap(([key, nestedValue]) =>
    (nestedValue?.value || '')
      .split('|')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => [key, value.replaceAll(/[{},\-]/g, '').toLowerCase()])
  );

  const contextSearchIdParams = Object.entries(
    rendering.fields?.data?.contextItemSearchIdParams || {}
  )
    .filter(([, value]) => value !== '')
    .map(([key, value]) => [
      key,
      value.replaceAll(/[{},\-]/g, '').toLowerCase(),
    ]); // clean up bad ID characters

  const params = [
    ['verticalKey', 'articles'],
    ...customFilters,
    ...contextSearchParams,
    ...contextSearchIdParams,
  ].map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings

  const query = `?${params.join('&')}`;

  const ctaParams = [
    ...customFilters,
    ...contextSearchParams,
    ...contextSearchIdParams,
  ].map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings
  const ctaQuery = `?${ctaParams.join('&')}`;

  try {
    const url = new URL(query, `${SERVER_API_URL}${SEARCH_PATH}`);
    debug.common('yext fetch url', url.href);
    const response = await fetch(url.href);
    if (response.ok) {
      const data = await response.json();

      const selectedData = data.response.results.map(
        (result: BlogRelatedArticlesResult) => {
          return result.data;
        }
      );

      return {
        BlogRelatedArticles: selectedData,
        ctaQuery,
        apiUrl: url.href,
      };
    } else {
      throw {
        url,
        statusText: response.statusText,
      };
    }
  } catch (error) {
    console.error(
      {
        message: 'Blog Related Articles server-side data fetching error',
        error: error,
      },
      error
    );
    return { BlogRelatedArticles: [], ctaQuery };
  }
};
