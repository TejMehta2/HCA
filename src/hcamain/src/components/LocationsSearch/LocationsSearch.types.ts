import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import { ApiSearchProps } from 'src/types/searchProps';

export interface SearchResponse {
  meta: Meta;
  response: Response;
  ip: string;
}

export interface Meta {
  uuid: string;
  errors: unknown[];
}

export interface Response {
  businessId: number;
  queryId: string;
  resultsCount: number;
  results: { data: Data }[];
  appliedQueryFilters: unknown[];
  facets: unknown[];
  source: string;
  searchIntents: unknown[];
  locationBias: null;
}

export interface Coordinate {
  latitude?: number;
  longitude?: number;
}

export interface Data {
  id: string;
  type: string;
  abstractTitle: string;
  abstractImageUrl: string;
  title: string;
  description: string;
  name: string;
  imageUrl: string;
  primaryImageUrl: string;
  url: string;
  uid: number;
  lat: string;
  lng: string;
  directions: string;
  googlePlaceId: string;
  geocodedCoordinate: Coordinate;
}

export interface HighlightedFields {
  name: null;
  description: null;
  title: null;
}

export type Autocomplete = AutocompleteResponseResult[];

export interface AutocompleteResponseInput {
  value: string;
  queryIntents: unknown[];
}

export interface AutocompleteResponseResult {
  LocationName: string;
  LocationKey: string;
  LocationType: number;
  PostCode: string;
  Latitude: number;
  Longitude: number;
  LatLongString: string;
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
      value: Field<string>;
      id: string; 
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

export interface Fields {
  CTACardText?: Field<string>;
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
  SearchResultsTextWithInput?: Field<string>;
  ResultsPerPage?: Field<number>;
  SearchBy?: FilterOption[];
  FilterBy?: FilterOption[];

  GridViewIcon?: HCAIconFields;
  GridViewText?: Field<string>;
  MapViewIcon?: HCAIconFields;
  MapViewText?: Field<string>;
  GetDirectionsText?: Field<string>;
}

export type LocationsSearchProps = ApiSearchProps & {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};
