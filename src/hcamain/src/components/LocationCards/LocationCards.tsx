import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
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

import { CardBlockProps } from '@component-library/site-components/CardBlock/CardBlock.types';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import Text from '@component-library/foundation/Text/Text';
import getSubheadingTag from 'lib/subheading-tag-getter';
import CardMap from '@component-library/components/CardMap/CardMap';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';

const BASE_URL = `${process.env.NEXT_PUBLIC_DATALAYER_URL}/locations`;

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
            Patient Stories Cards please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

const returnCards = (props: LocationCardsProps, data: StaticProps) => {
  let cards;
  const linkText = props?.fields?.data?.item?.cTAText?.jsonValue;
  const getDirectionsText =
    props?.fields?.data?.item?.getDirectionsText?.jsonValue;
  const quantity = props?.fields?.data?.item?.numberOfCards?.jsonValue?.value;
  const locations = data?.Locations?.slice(0, Number(quantity) || 3);

  if (
    props?.fields?.data?.item?.locations?.PagesList &&
    props?.fields?.data?.item?.locations?.PagesList.length
  ) {
    cards = props?.fields?.data?.item?.locations?.PagesList.map(
      ({ title, street, postCode, city, image, url, getDirections }, index) => (
        <CardMap
          key={index}
          title={
            <Text
              variation="heading-1"
              tag={getSubheadingTag(props.params?.HeadingTag, 'h4')}
            >
              <JssText field={title} />
            </Text>
          }
          address={
            <>
              {street?.value && (
                <Text variation={'body-large'} tag="span">
                  <JssText field={street} />
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
          image={<JssImage field={image?.value} />}
          ctas={{
            button1: (
              <a href={url.path}>
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
        ({ id, title, name, description, imageUrl, url, directions }) => (
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
            image={imageUrl ? <img src={imageUrl} alt={title} /> : undefined}
            ctas={{
              button1: (
                <a href={url}>
                  <JssRichText field={linkText} tag="span" />
                </a>
              ),
              button2: (
                <a href={directions}>
                  <span>
                    <JssText field={getDirectionsText} />
                  </span>
                </a>
              ),
            }}
          />
        )
      );
  }

  return cards;
};

export const Grid = (props: LocationCardsProps): JSX.Element => {
  const columns: CardBlockProps['variation'] =
    props.params?.Columns === '4' ? '4-columns' : '3-columns';

  const data = useComponentProps<StaticProps>(props.rendering?.uid);

  const ctaQuery = data?.ctaQuery;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  const locationsCards = data && returnCards(props, data);
  const ctaLink =
    props?.fields?.data?.item?.locations?.PagesList &&
    props?.fields?.data?.item?.locations?.PagesList.length
      ? props.fields?.data?.item?.cTALink?.jsonValue?.value?.href
      : `${props.fields?.data?.item?.cTALink?.jsonValue?.value?.href}${ctaQuery}`;

  return (
    <CardBlock
      variation={columns}
      gapSize={'small'}
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          paddingSize="small"
          title={
            <Text
              variation={props.params?.HeadingSize || 'heading-1'}
              tag={props.params?.HeadingTag || 'h2'}
            >
              <JssTextWithEntityName
                field={props.fields?.data?.item?.title?.jsonValue}
              />
            </Text>
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
          props.fields?.data?.item?.cTALink?.jsonValue?.value && (
            <JssLink
              field={props.fields?.data?.item?.cTALink?.jsonValue?.value}
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

  const locationsCards = data && returnCards(props, data);

  const ctaLink =
    props?.fields?.data?.item?.locations?.PagesList &&
    props?.fields?.data?.item?.locations?.PagesList.length
      ? props.fields?.data?.item?.cTALink?.jsonValue?.value?.href
      : `${props.fields?.data?.item?.cTALink?.jsonValue?.value?.href}${ctaQuery}`;

  return (
    <CarouselCards
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h3'}
          variation={props.params?.HeadingSize || 'display-5'}
        >
          <JssTextWithEntityName
            field={props.fields?.data?.item?.title?.jsonValue}
          />
        </Text>
      }
      bodyCopy={
        <Text variation={'body-large'}>
          <JssText field={props.fields?.data?.item?.text?.jsonValue} />
        </Text>
      }
      link={
        !isExperienceEditor ? (
          <a href={ctaLink}>
            <JssTextWithEntityName
              field={{
                value:
                  props.fields?.data?.item?.cTALink?.jsonValue?.value.text ||
                  '',
              }}
              isRichText={true}
            />
          </a>
        ) : (
          props.fields?.data?.item?.cTALink?.jsonValue?.value && (
            <JssLink
              field={props.fields?.data?.item?.cTALink?.jsonValue?.value}
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
  const fields = rendering.fields?.data?.item;

  // Format props into entries, then query params
  const customFilters =
    (fields?.filterOptions?.filterOptionsList &&
      fields?.filterOptions?.filterOptionsList.map((item) => [
        item.filter?.value,
        item.filterValueGuid?.id,
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
    const url = new URL(query, `${BASE_URL}/search`);

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
