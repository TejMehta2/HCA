import React from 'react';
import {
  Field,
  Item,
  ImageField,
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  LinkField,
  GetStaticComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import Text from '@component-library/foundation/Text/Text';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';

import getBaselineParams from 'lib/getBaselineParams';
import useSearchForm from '@component-library/hooks/useSearchForm/useSearchForm';
import { ApiResponse, ApiSearchProps } from 'src/types/searchProps';
import { LocationCardApi } from './LocationCardApi';
import { LocationCardDefault } from './LocationCardDefault';

const BASE_URL = `${process.env.NEXT_PUBLIC_DATALAYER_URL}/locations`;

export interface SearchResponse {
  meta: Meta;
  response: Response;
}

export interface Meta {
  uuid: string;
  errors: unknown[];
}

export interface Response {
  businessId: number;
  queryId: string;
  resultsCount: number;
  results: Result[];
  appliedQueryFilters: unknown[];
  facets: unknown[];
  source: string;
  searchIntents: unknown[];
  locationBias: null;
}

export interface Result {
  data: Data;
  highlightedFields: HighlightedFields;
}

export interface Data {
  id: string;
  type: string;
  title: string;
  description: string;
  name: string;
  imageUrl: null;
  url: string;
  uid: number;
}

export interface HighlightedFields {
  name: null;
  description: null;
  title: null;
}

export interface Autocomplete {
  meta: Meta;
  response: AutocompleteResponse;
}

export interface AutocompleteResponseMeta {
  uuid: string;
  errors: unknown[];
}

export interface AutocompleteResponse {
  input: AutocompleteResponseInput;
  results: AutocompleteResponseResult[];
}

export interface AutocompleteResponseInput {
  value: string;
  queryIntents: unknown[];
}

export interface AutocompleteResponseResult {
  value: string;
  matchedSubstrings: unknown[];
  queryIntents: unknown[];
  verticalKeys: unknown[];
}

export type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

export interface FilterOption {
  displayName: string;
  fields: {
    DisplayName?: Field<string>;
    Filter?: Field<string>; // e.g. { value: 'locationId' }
    FilterValueGuid?: {
      id: string; //  e.g. { id: 'Birmingham' }
    };
    FilterValueString: Field<string>; // e.g. { value: 'Birmingham' }
  };
}

export interface FilterCategory {
  displayName: string;
  fields: {
    Header: Field<string>;
    Filters: FilterOption[];
  };
}

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type FilterOptionFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { jsonValue?: Item };
};

type LocationsFields = {
  title?: { value?: string };
  image?: { jsonValue?: ImageField };
  city?: { value?: string };
  street?: { value?: string };
  postCode?: { value?: string };
  getDirections?: { value?: string };
  url: { path?: string };
};

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      locations?: {
        PagesList?: LocationsFields[];
      };
      filterOptions?: {
        filterOptionsList?: FilterOptionFields[];
      };
      cTAText?: { jsonValue?: Field<string> };
      getDirectionsText?: { jsonValue?: Field<string> };
      numberOfCards?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      treatmentId?: string;
      serviceLineId?: string;
      scanId?: string;
      conditionId?: string;
    };
  };
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  SearchPlaceholder?: Field<string>;
  FilterOptionsIcon?: HCAIconFields;
  FilterOptionsText?: Field<string>;
  FilterOptions?: FilterCategory[];
  SortOptionsIcon?: HCAIconFields;
  SortOptionsText?: Field<string>;
  SortOptions?: FilterOption[];
  SearchResultsText?: Field<string>;
  ResultsPerPage?: Field<number>;
  SearchBy?: FilterOption[];
  FilterBy?: FilterOption[];

  GridViewIcon?: HCAIconFields;
  GridViewText?: Field<string>;
  MapViewIcon?: HCAIconFields;
  MapViewText?: Field<string>;
}

type LocationCardsProps = {
  params?: Params;
  fields?: Fields;
  fallbackData?: SearchResponse;
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

  // const isApiData = props.fields?.data?.item?.locations?.PagesList &&
  // props.fields?.data?.item?.locations?.PagesList.length

  const isApiData = false;

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
              {props.fields?.data?.item?.title?.jsonValue?.value}
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
            <JssRichText
              tag="span"
              field={{
                value: props.fields?.data?.item?.cTALink?.jsonValue?.value.text,
              }}
            />
          </JssLink>
        )
      }
    >
      {isApiData
        ? data?.response.results &&
          data?.response.results.length &&
          LocationCardApi(
            data?.response.results,
            props?.fields?.data?.item?.cTAText?.jsonValue,
            props?.fields?.data?.item?.getDirectionsText?.jsonValue
          )
        : LocationCardDefault(
            props.fields?.data?.item?.locations?.PagesList,
            props?.fields?.data?.item?.cTAText?.jsonValue,
            props?.fields?.data?.item?.getDirectionsText?.jsonValue
          )}
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

  if (!fields || error || autocompleteError) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  // const isApiData = props.fields?.data?.item?.locations?.PagesList &&
  // props.fields?.data?.item?.locations?.PagesList.length

  const isApiData = false;

  return (
    <CarouselCards
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h3'}
          variation={props.params?.HeadingSize || 'display-5'}
        >
          {props.fields?.data?.item?.title?.jsonValue?.value}
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
            <JssRichText
              tag="span"
              field={{
                value: props.fields?.data?.item?.cTALink?.jsonValue?.value.text,
              }}
            />
          </JssLink>
        )
      }
    >
      {isApiData
        ? data?.response.results &&
          LocationCardApi(
            data?.response.results,
            props?.fields?.data?.item?.cTAText?.jsonValue,
            props?.fields?.data?.item?.getDirectionsText?.jsonValue
          )
        : LocationCardDefault(
            props.fields?.data?.item?.locations?.PagesList,
            props?.fields?.data?.item?.cTAText?.jsonValue,
            props?.fields?.data?.item?.getDirectionsText?.jsonValue
          )}
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
