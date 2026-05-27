import { Suspense, type JSX } from 'react';
import {
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  debug,
} from '@sitecore-content-sdk/nextjs';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import CardBlog from '@component-library/components/CardBlog/CardBlog';
import Tags from '@component-library/core-components/Tags/Tags';
import JssDate from 'src/jss-abstractions/JssDate/JssDate';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';
import type {
  BlogRelatedArticlesProps,
  BlogRelatedArticles as BlogRelatedArticle,
  BlogRelatedArticlesResult,
  StaticProps,
} from './BlogRelatedArticles.types';
import formatDate from 'src/jss-abstractions/JssDate/formatDate';
import getSubheadingTag from 'lib/subheading-tag-getter';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Image from 'next/image';
import ImageUrl from 'src/jss-abstractions/ImageUrl';
import getHeadingTags from 'lib/getHeadingTags';
import { upsertQuerystringParam } from 'lib/utility-functions/addThumbnailParameter';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';

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

const BlogRelatedArticlesContent = async (
  props: BlogRelatedArticlesProps
): Promise<JSX.Element> => {
  const isExperienceEditor = props.page.mode.isEditing;
  const serverResponseData = await getBlogRelatedArticlesData(props.fields);
  const quantity =
    Number(props?.fields?.data?.item?.numberOfCards?.jsonValue?.value) || 3;

  const ctaQuery = serverResponseData?.ctaQuery;
  const baseBlogUrl = props.fields?.data?.item?.blogUrl?.jsonValue?.value.href;
  const queryString = 'articleTypeId';
  const currentArticleId = props.page.layout.sitecore.route?.itemId?.toString();
  const formattedCurrentArticleId =
    currentArticleId && currentArticleId.replace(/[-{}]/g, '').toLowerCase();

  const relatedArticlesDisplayed =
    serverResponseData?.BlogRelatedArticles?.reduce<BlogRelatedArticle[]>(
      (acc: BlogRelatedArticle[], curr: BlogRelatedArticle) => {
        if (
          acc?.length >= quantity ||
          curr?.pageId === formattedCurrentArticleId
        )
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
            <a href={card.url?.path}>
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
            </a>

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
        }: BlogRelatedArticle,
        index: number
      ) => {
        const cardImageSrc = ImageUrl(
          abstractImageUrl,
          primaryImageUrl,
          imageUrl
        );
        return (
          <CardBlog key={index}>
            {cardImageSrc !== undefined ? (
              <a href={`${url}`}>
                <Image
                  src={upsertQuerystringParam(cardImageSrc, 't', 'w750')}
                  alt={name}
                  width="643"
                  height="605"
                  quality={90}
                />
              </a>
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
              <span
                dangerouslySetInnerHTML={{
                  __html: abstractText || description || '',
                }}
              />
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

  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || props?.fields?.Title?.value;

  const componentAnchorId = generateHtmlSafeId(tableOfContentTitle);

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

export const Default = (props: BlogRelatedArticlesProps): JSX.Element => (
  <Suspense fallback={<LoaderCF loadingMsg='Loading articles...'/>}>
    <BlogRelatedArticlesContent {...props} />
  </Suspense>
);

async function getBlogRelatedArticlesData(
  renderingFields?: BlogRelatedArticlesProps['fields']
): Promise<StaticProps> {
  const fields = renderingFields?.data?.item;

  debug.common(
    'BlogRelatedArticlesProps: rendering.fields?.data',
    renderingFields?.data
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
    renderingFields?.data?.contextItemSearchParams || {}
  ).flatMap(([key, nestedValue]) =>
    (nestedValue?.value || '')
      .split('|')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => [key, value.replaceAll(/[{},\-]/g, '').toLowerCase()])
  );

  const contextSearchIdParams = Object.entries(
    renderingFields?.data?.contextItemSearchIdParams || {}
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
}
