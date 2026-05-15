import { Field } from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import Params from 'src/types/params';
import { ApiSearchPropsJson } from 'src/types/searchProps';

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
  targetItem: {
    svgMarkup?: Field<string>;
  };
};

export interface FilterOption {
  displayName?: Field<string>;
  filter?: Field<string>; // e.g. { value: 'locationId' }
  filterValueGuid?: { targetItem: { id: string } };
  filterValueString?: Field<string>; // e.g. { value: 'Birmingham' }
}

export interface FilterCategory {
  header: Field<string>;
  filters: { targetItems: FilterOption[] };
}

export interface Fields {
  cTACardText?: Field<string>;
  heading?: { jsonValue: Field<string> };
  title?: { jsonValue: Field<string> };
  text?: { jsonValue: Field<string> };
  searchPlaceholder?: Field<string>;
  filterOptionsIcon?: HCAIconFields;
  filterOptionsText?: Field<string>;
  filterOptions?: { targetItems: FilterCategory[] };
  sortOptionsIcon?: HCAIconFields;
  sortOptionsText?: Field<string>;
  sortOptions?: { targetItems: FilterOption[] };
  searchResultsText?: Field<string>;
  searchResultsTextWithInput?: Field<string>;
  resultsPerPage?: Field<number>;
  searchBy?: { targetItems: FilterOption[] };
  filterBy?: { targetItems: FilterOption[] };
  gridViewIcon?: HCAIconFields;
  gridViewText?: Field<string>;
  mapViewIcon?: HCAIconFields;
  mapViewText?: Field<string>;
  getDirectionsText?: Field<string>;
}

export type LocationsSearchProps = ComponentWithContextProps & ApiSearchPropsJson & {
  params?: Params;
  fields?: {
    data?: {
      item?: Fields;
    };
  };
  rendering?: {
    uid?: string;
  };
};
