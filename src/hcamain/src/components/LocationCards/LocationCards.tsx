import React from 'react';
import {
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  GetStaticComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';

import getBaselineParams from 'lib/getBaselineParams';
import useSearchForm from '@component-library/hooks/useSearchForm/useSearchForm';
import { ApiResponse, ApiSearchProps } from 'src/types/searchProps';
import {
  LocationCardApi,
  LocationCardDefault,
} from './helpers/getLocationCards';
import {
  Autocomplete,
  LocationCardsProps,
  SearchResponse,
} from './LocationCardsTypes';
const BASE_URL = `${process.env.NEXT_PUBLIC_DATALAYER_URL}/locations`;
// type CTAIconFields = {
//   svgMarkup?: Field<string>;
// };

// type FilterOptionFields = {
//   displayName?: { value?: string };
//   filter?: { value?: string };
//   filterValueString?: { value?: string };
//   filterValueGuid?: { jsonValue?: Item };
// };

// type LocationsFields = {
//   title?: { value?: string };
//   image?: { jsonValue?: ImageField };
//   city?: { value?: string };
//   street?: { value?: string };
//   postCode?: { value?: string };
//   getDirections?: { value?: string };
//   url: { path?: string };
// };

// interface Fields {
//   data?: {
//     item?: {
//       heading?: { jsonValue?: Field<string> };
//       title?: { jsonValue?: Field<string> };
//       text?: { jsonValue?: Field<string> };
//       cTAIcon?: {
//         Icon?: CTAIconFields;
//       };
//       cTALink?: { jsonValue?: LinkField };
//       locations?: {
//         LocationsList?: LocationsFields[];
//       };
//       filterOptions?: {
//         filterOptionsList?: FilterOptionFields[];
//       };
//       cTAText?: { jsonValue?: Field<string> };
//       getDirectionsText?: { jsonValue?: Field<string> };
//       numberOfCards?: { jsonValue?: Field<string> };
//     };
//     contextItemSearchIdParams?: {
//       treatmentId?: string;
//       serviceLineId?: string;
//       scanId?: string;
//       conditionId?: string;
//     };
//   };
// }

type LocationCardsProps = {
  params?: Params;
  fields?: Fields;
};

const LocationCardsDefaultComponent = (
  props: LocationCardsProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">LocationCards no datasource</span>
    </div>
  </div>
);

export const Grid = (props: LocationCardsProps): JSX.Element => {
  const { fallbackData, fields } = props;

  console.log(props);

  // Set up default baseline parameters from CMS
  const { baselineParams } = getBaselineParams(props);

  // Hooks
  const { data, error, autocompleteError } = useSearchForm<
    SearchResponse,
    Autocomplete
  >({
    baseUrl: BASE_URL,
    baselineParams: [...baselineParams, ['verticalKey', 'locations']],
    fallbackData: fallbackData,
  });

  if (!fields || error || autocompleteError) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  if (!fields || error || autocompleteError) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  // const isApiData = props.fields?.data?.item?.locations?.PagesList &&
  // props.fields?.data?.item?.locations?.PagesList.length

  const isApiData = true;

  const locationsApi =
    data?.response.results &&
    data?.response.results.length > 0 &&
    props?.fields?.data?.item?.cTAText?.jsonValue &&
    props?.fields?.data?.item?.getDirectionsText?.jsonValue ? (
      LocationCardApi(
        data?.response.results,
        props?.fields?.data?.item?.cTAText?.jsonValue,
        props?.fields?.data?.item?.getDirectionsText?.jsonValue
      )
    ) : (
      <></>
    );

  const locationDefault =
    props.fields?.data?.item?.locations?.PagesList &&
    props.fields?.data?.item?.locations?.PagesList.length > 0 &&
    props?.fields?.data?.item?.cTAText?.jsonValue &&
    props?.fields?.data?.item?.getDirectionsText?.jsonValue ? (
      LocationCardDefault(
        props.fields?.data?.item?.locations?.PagesList,
        props?.fields?.data?.item?.cTAText?.jsonValue,
        props?.fields?.data?.item?.getDirectionsText?.jsonValue
      )
    ) : (
      <></>
    );

  return (
    <CardBlock
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          contentVariation="half-width"
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
          body={
            <Text variation={'body-large'}>
              <JssText field={props.fields?.data?.item?.text?.jsonValue} />
            </Text>
          }
          paddingSize="small"
        ></AdvancedBlockHeader>
      }
      variation="3-columns"
      cta={
        props.fields?.data?.item?.cTALink?.jsonValue?.value && (
          <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue?.value}>
            <JssTextWithEntityName
              field={{
                value:
                  props.fields?.data?.item?.cTALink?.jsonValue?.value.text ||
                  '',
              }}
              isRichText={true}
            />
          </JssLink>
        )
      }
    >
      {isApiData ? locationsApi : locationDefault}
    </CardBlock>
  );
};

export const Slider = (props: LocationCardsProps): JSX.Element => {
  const { fallbackData, fields } = props;

  // Set up default baseline parameters from CMS
  const { baselineParams } = getBaselineParams(props);

  // Hooks

  const { data, error, autocompleteError } = useSearchForm<
    SearchResponse,
    Autocomplete
  >({
    baseUrl: BASE_URL,
    baselineParams: [...baselineParams, ['verticalKey', 'locations']],
    fallbackData: fallbackData,
  });

  if (!fields || !data || error || autocompleteError) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  // const isApiData = props.fields?.data?.item?.locations?.PagesList &&
  // props.fields?.data?.item?.locations?.PagesList.length

  const isApiData = true;

  const locationsApi =
    data?.response.results &&
    data?.response.results.length > 0 &&
    props?.fields?.data?.item?.cTAText?.jsonValue &&
    props?.fields?.data?.item?.getDirectionsText?.jsonValue ? (
      LocationCardApi(
        data?.response.results,
        props?.fields?.data?.item?.cTAText?.jsonValue,
        props?.fields?.data?.item?.getDirectionsText?.jsonValue
      )
    ) : (
      <></>
    );

  const locationDefault =
    props.fields?.data?.item?.locations?.PagesList &&
    props.fields?.data?.item?.locations?.PagesList.length > 0 &&
    props?.fields?.data?.item?.cTAText?.jsonValue &&
    props?.fields?.data?.item?.getDirectionsText?.jsonValue ? (
      LocationCardDefault(
        props.fields?.data?.item?.locations?.PagesList,
        props?.fields?.data?.item?.cTAText?.jsonValue,
        props?.fields?.data?.item?.getDirectionsText?.jsonValue
      )
    ) : (
      <></>
    );

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
        props.fields?.data?.item?.cTALink?.jsonValue?.value && (
          <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue?.value}>
            <JssTextWithEntityName
              field={{
                value:
                  props.fields?.data?.item?.cTALink?.jsonValue?.value.text ||
                  '',
              }}
              isRichText={true}
            />
          </JssLink>
        )
      }
    >
      {isApiData ? locationsApi : locationDefault}
    </CarouselCards>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async (
  rendering: ApiSearchProps
) => {
  const { baselineParams } = getBaselineParams(rendering);
  const params = baselineParams.map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings
  const query = `?${params.join('&')}`;
  const url = new URL(query, BASE_URL); // compose API url

  try {
    const response = await fetch(url.href);
    if (response.ok) {
      const fallbackData = await response.json();
      rendering.fallbackData = fallbackData as ApiResponse;
      return rendering;
    } else {
      throw response.statusText;
    }
  } catch (error) {
    console.error(error);
    return rendering;
  }
};
