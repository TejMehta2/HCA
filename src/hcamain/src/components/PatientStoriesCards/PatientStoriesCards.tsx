/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text as JssText,
  RichText as JssRichText,
  Link as JssLink,
  useSitecoreContext,
  GetStaticComponentProps,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  patientStories as PatientStory,
  PatientStoriesCardsProps,
  patientStoriesResult,
  StaticProps,
} from './PatientStoriesCards.types';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import CardPatientStories from '@component-library/components/CardPatientStories/CardPatientStories';
import SideScrollingCards from '@component-library/site-components/SideScrollingCards/SideScrollingCards';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import Text from '@component-library/foundation/Text/Text';
import getSubheadingTag from 'lib/subheading-tag-getter';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Image from 'next/image';
import ImageUrl from 'src/jss-abstractions/ImageUrl';

import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}/patientstories`;
const SEARCH_PATH = '/search';

const PatientStoriesCardsDefaultComponent = (
  props: PatientStoriesCardsProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Patient Stories. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

const returnCards = (
  props: PatientStoriesCardsProps,
  patientStories: PatientStory[],
  isSlider: boolean
) => {
  let cards;

  if (
    props?.fields?.data?.item?.patientStories?.PatientStoriesList &&
    props?.fields?.data?.item?.patientStories?.PatientStoriesList.length
  ) {
    cards = props?.fields?.data?.item?.patientStories?.PatientStoriesList.map(
      (
        { abstractTitle, title, abstractText, text, abstractImage, image, url },
        index
      ) => (
        <CardPatientStories
          key={index}
          title={
            <Text
              tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
              variation="display-4"
            >
              {abstractTitle?.value ? (
                <JssText field={abstractTitle} />
              ) : (
                <JssText field={title} />
              )}
            </Text>
          }
          bodyCopy={
            <Text tag="div" variation="body-large">
              {abstractText?.value ? (
                <JssRichText field={abstractText} />
              ) : (
                <JssRichText field={text} />
              )}
            </Text>
          }
          image={
            abstractImage?.jsonValue?.value?.src ? (
              <NextJssImage
                field={abstractImage.jsonValue}
                editable={false}
                next={{
                  width: 500,
                  height: 400,
                  sizes: '(max-width: 768px) 100vw, 30vw',
                }}
              />
            ) : (
              <NextJssImage
                field={image?.jsonValue}
                editable={false}
                next={{
                  width: 500,
                  height: 400,
                  sizes: '(max-width: 768px) 100vw, 30vw',
                }}
              />
            )
          }
          link={
            <a href={`${url?.path}`}>
              <JssRichText
                field={props.fields?.data?.item?.cTAText?.jsonValue}
              />
            </a>
          }
          contentVariation={isSlider ? 'mixed' : undefined}
        />
      )
    );
  } else {
    {
      cards =
        patientStories &&
        patientStories.map(
          ({
            id,
            title,
            name,
            description,
            imageUrl,
            url,
            abstractImageUrl,
            primaryImageUrl,
            abstractTitle,
            abstractText,
          }) => {
            const cardImageSrc = ImageUrl(
              abstractImageUrl,
              primaryImageUrl,
              imageUrl
            );

            return (
              <CardPatientStories
                key={id}
                title={
                  <Text
                    tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
                    variation="display-4"
                  >
                    {abstractTitle || title || name}
                  </Text>
                }
                bodyCopy={
                  <Text tag="span" variation="body-large">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: abstractText || description,
                      }}
                    ></span>
                  </Text>
                }
                image={
                  cardImageSrc !== undefined ? (
                    <Image
                      width={500}
                      height={400}
                      sizes={'(max-width: 768px) 100vw, 30vw'}
                      src={cardImageSrc}
                      alt={abstractTitle || title}
                    />
                  ) : undefined
                }
                link={
                  <a href={url}>
                    <span>
                      <JssText
                        field={props.fields?.data?.item?.cTAText?.jsonValue}
                      />
                    </span>
                  </a>
                }
              />
            );
          }
        );
    }
  }
  return cards;
};

//  remove the current story
const returnFilteredCards = (
  props: PatientStoriesCardsProps,
  data?: StaticProps,
  currentStoryId?: string
) => {
  const quantity = Number(
    props?.fields?.data?.item?.numberOfCards?.jsonValue?.value
  );

  const formattedCurrentStoryId =
    currentStoryId && currentStoryId.replace(/[-{}]/g, '').toLowerCase();

  const patientStoriesDisplayed = data?.patientStories?.reduce((acc, curr) => {
    if (acc?.length >= quantity || curr?.pageId === formattedCurrentStoryId)
      return acc;
    return [...acc, curr];
  }, []);

  return patientStoriesDisplayed;
};

export const Default = (props: PatientStoriesCardsProps): JSX.Element => {
  const numberOfCards = props.params?.Columns || '3';

  const data = useComponentProps<StaticProps>(props.rendering?.uid);
  const ctaQuery = data?.ctaQuery;

  const { sitecoreContext } = useSitecoreContext();
  const currentStoryId = sitecoreContext?.route?.itemId?.toString();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields?.data?.item) {
    return <PatientStoriesCardsDefaultComponent {...props} />;
  }

  const patientStoriesCardsFiltered = returnFilteredCards(
    props,
    data,
    currentStoryId
  );

  const patientStoriesCards =
    patientStoriesCardsFiltered &&
    returnCards(props, patientStoriesCardsFiltered, false);

  if (!patientStoriesCards?.length && !isExperienceEditor) {
    return <></>;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  const viewAllCta = props?.fields?.data?.item?.patientStories
    ?.PatientStoriesList?.length
    ? props.fields?.data?.item?.cTALink?.jsonValue?.value?.href
    : `${props.fields?.data?.item?.cTALink?.jsonValue?.value?.href}${ctaQuery}`;
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.item?.heading?.jsonValue?.value
  );
  return (
    <CardBlock
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      variation={`${numberOfCards}-columns`}
      gapSize={'small'}
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          paddingSize="small"
          title={
            (props.fields?.data?.item?.title?.jsonValue ||
              isExperienceEditor) && (
              <>
                <Text
                  variation={props.params?.HeadingSize || 'display-3'}
                  tag={headingTag}
                >
                  <JssText
                    tag={'span'}
                    field={props.fields?.data?.item?.title?.jsonValue}
                  />
                </Text>
              </>
            )
          }
          subtitle={
            (props.fields?.data?.item?.heading?.jsonValue ||
              isExperienceEditor) && (
              <Text tag={subheadingTag} variation={'subheading-1'}>
                <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
              </Text>
            )
          }
          body={
            (props.fields?.data?.item?.text?.jsonValue ||
              isExperienceEditor) && (
              <Text tag="div" variation="body-large">
                <JssRichText
                  field={props.fields?.data?.item?.text?.jsonValue}
                />
              </Text>
            )
          }
        />
      }
      cta={
        !isExperienceEditor ? (
          viewAllCta ? (
            <a href={viewAllCta}>
              {props?.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value,
                  }}
                ></span>
              )}
              {props.fields?.data?.item?.cTALink?.jsonValue?.value?.text && (
                <>
                  <JssRichText
                    field={{
                      value:
                        props.fields?.data?.item?.cTALink?.jsonValue?.value
                          ?.text || '',
                    }}
                  />
                </>
              )}
            </a>
          ) : undefined
        ) : (
          <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue} />
        )
      }
    >
      <>{patientStoriesCards}</>
    </CardBlock>
  );
};

export const Slider = (props: PatientStoriesCardsProps): JSX.Element => {
  const data = useComponentProps<StaticProps>(props.rendering?.uid);

  const ctaQuery = data?.ctaQuery;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  const currentStoryId = sitecoreContext?.route?.itemId?.toString();

  if (!props.fields?.data?.item) {
    return <PatientStoriesCardsDefaultComponent {...props} />;
  }

  const patientStoriesCardsFiltered = returnFilteredCards(
    props,
    data,
    currentStoryId
  );

  const patientStoriesCards =
    patientStoriesCardsFiltered &&
    returnCards(props, patientStoriesCardsFiltered, false);

  if (!patientStoriesCards?.length && !isExperienceEditor) {
    return <></>;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  const viewAllCta = props?.fields?.data?.item?.patientStories
    ?.PatientStoriesList?.length
    ? props.fields?.data?.item?.cTALink?.jsonValue?.value?.href
    : `${props.fields?.data?.item?.cTALink?.jsonValue?.value?.href}${ctaQuery}`;
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.item?.heading?.jsonValue?.value
  );

  return (
    <CarouselCards
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={headingTag}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JssText field={props.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      subtitle={
        !isExperienceEditor ? (
          props.fields?.data?.item?.heading?.jsonValue?.value ? (
            <Text tag={subheadingTag} variation={'subheading-1'}>
              <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
            </Text>
          ) : (
            <></>
          )
        ) : (
          <Text tag="span" variation={'subheading-1'}>
            <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
          </Text>
        )
      }
      bodyCopy={
        <Text variation={'body-large'} tag="div">
          <JssRichText field={props.fields?.data?.item?.text?.jsonValue} />
        </Text>
      }
      link={
        !isExperienceEditor ? (
          props.fields?.data?.item?.cTALink?.jsonValue?.value?.href ? (
            <a href={viewAllCta}>
              {props?.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value,
                  }}
                ></span>
              )}
              {props.fields?.data?.item?.cTALink?.jsonValue?.value?.text && (
                <>
                  <JssRichText
                    tag="div"
                    field={{
                      value:
                        props.fields?.data?.item?.cTALink?.jsonValue?.value
                          ?.text || '',
                    }}
                  />
                </>
              )}
            </a>
          ) : undefined
        ) : (
          props.fields?.data?.item?.cTALink?.jsonValue?.value && (
            <JssLink
              field={props.fields?.data?.item?.cTALink?.jsonValue?.value}
            ></JssLink>
          )
        )
      }
    >
      {patientStoriesCards}
    </CarouselCards>
  );
};

export const SliderWithLeftText = (
  props: PatientStoriesCardsProps
): JSX.Element => {
  const data = useComponentProps<StaticProps>(props.rendering?.uid);
  const ctaQuery = data?.ctaQuery;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  const currentStoryId = sitecoreContext?.route?.itemId?.toString();

  if (!props.fields?.data?.item) {
    return <PatientStoriesCardsDefaultComponent {...props} />;
  }

  const patientStoriesCardsFiltered = returnFilteredCards(
    props,
    data,
    currentStoryId
  );

  const patientStoriesCards =
    patientStoriesCardsFiltered &&
    returnCards(props, patientStoriesCardsFiltered, true);

  const viewAllCta = props?.fields?.data?.item?.patientStories
    ?.PatientStoriesList?.length
    ? props.fields?.data?.item?.cTALink?.jsonValue?.value?.href
    : `${props.fields?.data?.item?.cTALink?.jsonValue?.value?.href}${ctaQuery}`;

  if (!patientStoriesCards?.length && !isExperienceEditor) {
    return <></>;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  return (
    <SideScrollingCards
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      title={<JssText field={props.fields?.data?.item?.title?.jsonValue} />}
      link={
        !isExperienceEditor ? (
          props.fields?.data?.item?.cTALink?.jsonValue?.value?.href ? (
            <a href={viewAllCta}>
              {props?.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value,
                  }}
                ></span>
              )}
              {props.fields?.data?.item?.cTALink?.jsonValue?.value?.text && (
                <>
                  <JssRichText
                    field={{
                      value:
                        props.fields?.data?.item?.cTALink?.jsonValue?.value
                          ?.text || '',
                    }}
                  />
                </>
              )}
            </a>
          ) : undefined
        ) : (
          props.fields?.data?.item?.cTALink?.jsonValue.value && (
            <JssLink
              field={props.fields?.data?.item?.cTALink?.jsonValue?.value}
            ></JssLink>
          )
        )
      }
      bodyCopy={
        <JssRichText
          tag="div"
          field={props.fields?.data?.item?.text?.jsonValue}
        />
      }
    >
      {patientStoriesCards}
    </SideScrollingCards>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async (
  rendering: PatientStoriesCardsProps
) => {
  const fields = rendering.fields?.data?.item;

  // Format props into entries, then query params
  const customFilters =
    (fields?.filterOptions?.filterOptionsList &&
      fields?.filterOptions?.filterOptionsList.map((item) => [
        item.filter?.value,
        item.filterValueGuid?.targetItem?.id
          .replaceAll(/[{},\-]/g, '')
          .toLowerCase(),
        ,
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
    ['verticalKey', 'patientstories'],
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
        (result: patientStoriesResult) => {
          return result.data;
        }
      );

      return {
        patientStories: selectedData,
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
        message: 'Patient Stories server-side data fetching error',
        error: error,
      },
      error
    );
    return { patientStories: [], ctaQuery };
  }
};
