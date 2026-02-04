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
  LocationCardsProps,
  LocationCardsResult,
  StaticProps,
} from './LocationCardsTypes';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import Text from '@component-library/foundation/Text/Text';
import getSubheadingTag from 'lib/subheading-tag-getter';
import CardMap from '@component-library/components/CardMap/CardMap';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';
import Image from 'next/image';
import ImageUrl from 'src/jss-abstractions/ImageUrl';
import returnDirections from 'src/jss-abstractions/GetDirections/GetDirections';
import RichText from '@component-library/core-components/RichText/RichText';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}`;
const SEARCH_PATH = '/locations/search';

const LocationCardsDefaultComponent = (
  props: LocationCardsProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Location Cards please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

const returnCards = (props: LocationCardsProps, data: StaticProps) => {
  let cards = [];
  const linkText = props?.fields?.data?.item?.cTAText?.jsonValue;
  const getDirectionsText =
    props?.fields?.data?.item?.getDirectionsText?.jsonValue;
  const quantity = props?.fields?.data?.item?.numberOfCards?.jsonValue?.value;
  const locations = data?.Locations?.slice(0, Number(quantity) || 3);

  if (
    props?.fields?.data?.item?.locations?.PagesList &&
    props?.fields?.data?.item?.locations?.PagesList.length
  ) {
    cards = props?.fields?.data?.item?.locations?.PagesList?.filter(
      (p) => p && Object.keys(p).length > 0
    ).map(
      (
        {
          abstractTitle,
          title,
          addressLine1,
          addressLine2,
          postCode,
          city,
          abstractImage,
          image,
          url,
          getDirections,
        },
        index
      ) => (
        <CardMap
          key={index}
          title={
            <Text
              variation="heading-1"
              tag={getSubheadingTag(props.params?.HeadingTag, 'h4')}
            >
              {abstractTitle?.value ? (
                <JssText field={abstractTitle} />
              ) : (
                <JssText field={title} />
              )}
            </Text>
          }
          address={
            <>
              {addressLine1?.value && (
                <Text variation={'body-large'} tag="span">
                  <JssText field={addressLine1} />
                  &nbsp;
                </Text>
              )}
              {addressLine2?.value && (
                <Text variation={'body-large'} tag="span">
                  <JssText field={addressLine2} />
                  &nbsp;
                </Text>
              )}
              {postCode?.value && (
                <Text variation={'body-large'} tag="span">
                  <JssText field={postCode} />
                  &nbsp;
                </Text>
              )}
              {city?.value && (
                <Text variation={'body-large'} tag="span">
                  <JssText field={city} />
                </Text>
              )}
            </>
          }
          image={
            abstractImage?.jsonValue?.value?.src ||
            image?.jsonValue?.value?.src ? (
              abstractImage?.jsonValue?.value?.src ? (
                <Image
                  src={abstractImage?.jsonValue?.value?.src || ''}
                  alt={(abstractImage?.jsonValue?.value?.alt as string) || ''}
                  width="560"
                  height="420"
                  quality={90}
                />
              ) : (
                <Image
                  src={image?.jsonValue?.value?.src || ''}
                  alt={(image?.jsonValue?.value?.alt as string) || ''}
                  width="560"
                  height="420"
                  quality={90}
                />
              )
            ) : undefined
          }
          ctas={{
            button1: (
              <a href={url?.path}>
                <JssRichText field={linkText} />
              </a>
            ),
            button2: (
              <a href={getDirections?.value}>
                <span>
                  <JssText field={getDirectionsText} />
                </span>
              </a>
            ),
          }}
        />
      )
    );
  } else {
    cards =
      locations &&
      locations.map(
        ({
          id,
          title,
          name,
          description,
          imageUrl,
          url,
          abstractImageUrl,
          primaryImageUrl,
          directions,
          googlePlaceId,
          geocodedCoordinate,
        }) => {
          const cardImageSrc = ImageUrl(
            abstractImageUrl,
            primaryImageUrl,
            imageUrl
          );

          const getDirections = returnDirections(
            googlePlaceId,
            directions,
            geocodedCoordinate
          );

          return (
            <CardMap
              key={id}
              title={
                <Text
                  variation="heading-1"
                  tag={getSubheadingTag(props.params?.HeadingTag, 'h4')}
                >
                  {title || name}
                </Text>
              }
              address={
                <>
                  {
                    <Text variation={'body-large'} tag="span">
                      {description}
                    </Text>
                  }
                </>
              }
              image={
                cardImageSrc !== undefined ? (
                  <Image
                    quality={90}
                    src={cardImageSrc}
                    alt={title}
                    width="560"
                    height="420"
                    sizes={'(max-width: 768px) 100vw, 30vw'}
                  />
                ) : undefined
              }
              ctas={{
                button1: (
                  <a href={url}>
                    <JssRichText field={linkText} tag="span" />
                  </a>
                ),
                button2: getDirections ? (
                  <a href={getDirections}>
                    <span>
                      <JssText field={getDirectionsText} />
                    </span>
                  </a>
                ) : undefined,
              }}
            />
          );
        }
      );
  }

  return cards;
};

export const Grid = (props: LocationCardsProps): JSX.Element => {
  const numberOfCards = props.params?.Columns || '3';

  const data = useComponentProps<StaticProps>(props.rendering?.uid);

  const ctaQuery = data?.ctaQuery;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  const locationsCards = data && returnCards(props, data);

  if (!locationsCards?.length && !isExperienceEditor) {
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

  const ctaLink =
    props?.fields?.data?.item?.locations?.PagesList &&
    props?.fields?.data?.item?.locations?.PagesList.length
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
            <>
              <Text
                variation={props.params?.HeadingSize || 'display-3'}
                tag={headingTag}
              >
                <JssTextWithEntityName
                  field={props.fields?.data?.item?.title?.jsonValue}
                />
              </Text>
            </>
          }
          subtitle={
            !isExperienceEditor ? (
              props.fields?.data?.item?.heading?.jsonValue?.value ? (
                <Text tag={subheadingTag} variation={'subheading-1'}>
                  <JssText
                    field={props.fields?.data?.item?.heading?.jsonValue}
                  />
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
          body={
            (props.fields?.data?.item?.text?.jsonValue ||
              isExperienceEditor) && (
              <Text tag="div" variation="body-large">
                <RichText>
                  <JssRichText
                    field={props.fields?.data?.item?.text?.jsonValue}
                  />
                </RichText>
              </Text>
            )
          }
        />
      }
      cta={
        !isExperienceEditor ? (
          <>
            {props.fields?.data?.item?.cTALink?.jsonValue?.value?.text && (
              <a href={ctaLink}>
                <JssTextWithEntityName
                  field={{
                    value:
                      props.fields?.data?.item?.cTALink?.jsonValue?.value
                        .text || '',
                  }}
                  isRichText={true}
                />
              </a>
            )}
          </>
        ) : (
          props.fields?.data?.item?.cTALink && (
            <JssLink
              field={props.fields?.data?.item?.cTALink.jsonValue}
            ></JssLink>
          )
        )
      }
    >
      <>{locationsCards}</>
    </CardBlock>
  );
};

export const Slider = (props: LocationCardsProps): JSX.Element => {
  const data = useComponentProps<StaticProps>(props.rendering?.uid);
  const ctaQuery = data?.ctaQuery;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  const locationsCards = data && returnCards(props, data);

  const ctaLink =
    props?.fields?.data?.item?.locations?.PagesList &&
    props?.fields?.data?.item?.locations?.PagesList.length
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
        <>
          <span id={componentAnchorId}></span>
          <Text
            tag={headingTag}
            variation={props.params?.HeadingSize || 'display-3'}
          >
            <JssTextWithEntityName
              field={props.fields?.data?.item?.title?.jsonValue}
            />
          </Text>
        </>
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
          <RichText>
            <JssRichText field={props.fields?.data?.item?.text?.jsonValue} />
          </RichText>
        </Text>
      }
      link={
        !isExperienceEditor ? (
          <>
            {props.fields?.data?.item?.cTALink?.jsonValue?.value?.text && (
              <a href={ctaLink}>
                <JssTextWithEntityName
                  field={{
                    value:
                      props.fields?.data?.item?.cTALink?.jsonValue?.value
                        .text || '',
                  }}
                  isRichText={true}
                />
              </a>
            )}
          </>
        ) : (
          props.fields?.data?.item?.cTALink && (
            <JssLink
              field={props.fields?.data?.item?.cTALink?.jsonValue}
            ></JssLink>
          )
        )
      }
    >
      {locationsCards}
    </CarouselCards>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async (
  rendering: LocationCardsProps
) => {
  // Skip locations search if locations were picked manually in the datasource
  if ((rendering.fields?.data?.item?.locations?.PagesList?.length ?? 0) > 0) {
    return { Locations: [] };
  }

  const fields = rendering.fields?.data?.item;

  // Format props into entries, then query params
  const customFilters =
    (fields?.filterOptions?.filterOptionsList &&
      fields?.filterOptions?.filterOptionsList.map((item) => [
        item.filter?.value,
        item.filterValueString?.value
          ? item.filterValueString.value
          : item.filterValueGuid?.targetItem?.id
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
    ['verticalKey', 'healthcare_facilities'],
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
        (result: LocationCardsResult) => {
          return result.data;
        }
      );

      return {
        Locations: selectedData,
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
        message: 'Locations server-side data fetching error',
        error: error,
      },
      error
    );
    return { Locations: [], ctaQuery };
  }
};
