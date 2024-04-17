import React from 'react';
import {
  GetStaticComponentProps,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  Image as JssImage,
  useComponentProps,
  useSitecoreContext,
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
  const queryString = 'serviceLineId';
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

  let cardsList;

  if (props.fields?.data?.item?.articles?.ArticlesList?.length) {
    cardsList = props.fields.data.item.articles.ArticlesList.map(
      (card, index) => {
        const formattedArticleId =
          card.articleType?.targetItem?.id &&
          card.articleType?.targetItem?.id
            .replaceAll(/[{},\-]/g, '')
            .toLowerCase();
        return (
          <CardBlog key={index}>
            {card.abstractImage?.jsonValue?.value?.src ? (
              <JssImage
                field={card.abstractImage?.jsonValue}
                editable={false}
              />
            ) : (
              <JssImage field={card.image?.jsonValue} editable={false} />
            )}

            <JssDate field={card.date?.jsonValue} />
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
            <Text tag="span" variation="body-large">
              {card.abstractText?.value ? (
                <JssRichText field={card.abstractText} />
              ) : (
                <JssRichText field={card.text} />
              )}
            </Text>
            {!!card.articleType && (
              <Tags>
                <a href={`${baseBlogUrl}?${queryString}=${formattedArticleId}`}>
                  <JssText field={card.articleType?.targetItem?.title} />
                </a>
              </Tags>
            )}
          </CardBlog>
        );
      }
    );
  } else if (relatedArticlesDisplayed) {
    cardsList = relatedArticlesDisplayed.map(
      (
        { imageUrl, name, date, url, title, description, typeName, typeId },
        index
      ) => (
        <CardBlog key={index}>
          <img src={imageUrl} alt={name} width="643" height="605" />
          <time>{formatDate(new Date(date))}</time>
          {title && (
            <Text
              tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
              variation="heading-2"
            >
              <a href={`${url}`}>{title}</a>
            </Text>
          )}
          <Text tag="span" variation="body-large">
            {description}
          </Text>

          {typeId && typeName && (
            <Tags>
              <a href={`${baseBlogUrl}?${queryString}=${typeId}`}>{typeName}</a>
            </Tags>
          )}
        </CardBlog>
      )
    );
  }

  const viewAllCta = props.fields?.data?.item?.articles?.ArticlesList?.length
    ? props.fields?.data?.item?.cTALink?.jsonValue?.value?.href
    : `${props.fields?.data?.item?.cTALink?.jsonValue?.value?.href}${ctaQuery}`;

  return (
    <CarouselCards
      title={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-5'}
        >
          <JssTextWithEntityName
            field={props?.fields?.data?.item?.title?.jsonValue}
          />
        </Text>
      }
      link={
        !isExperienceEditor ? (
          viewAllCta ? (
            <Button size={'large'} variation={'full'}>
              <a href={viewAllCta}>
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
        ) : (
          <JssLink
            field={props.fields?.data?.item?.cTALink?.jsonValue}
          ></JssLink>
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

  const contextSearchParams = customFilters.length
    ? ''
    : Object.entries(rendering.fields?.data?.contextItemSearchParams || {})
        .filter(([, nestedValue]) => nestedValue.value !== '')
        .map(([key, nestedValue]) => [
          key,
          nestedValue?.value &&
            nestedValue?.value.replaceAll(/[{},\-]/g, '').toLowerCase(),
        ]);

  const contextSearchIdParams = customFilters.length
    ? ''
    : Object.entries(rendering.fields?.data?.contextItemSearchIdParams || {})
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
