import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export interface ApiResponse {
  meta: Meta;
  response: Response;
  ip?: string;
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
  abstractTitle: string;
  abstractText: string;
  abstractImageUrl: string;
  title: string;
  description: string;
  name: string;
  imageUrl: string;
  primaryImageUrl: string;
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
    FilterValueGuid?: string;
    FilterValueString: Field<string>; // e.g. { value: 'Birmingham' }
  };
}

export interface FilterOptionJson {
  displayName?: {
    value: Field<string>;
  };
  filter?: {
    value: Field<string>;
  };
  filterValueGuid?: {
    value: string;
  };
  filterValueString?: string;
}

export interface YextFacetJson {
  displayName?: {
    value: string;
  };
  filter?: {
    value: string;
  };
  yextFieldId?: {
    value: string;
  };
}

export interface FilterCategory {
  displayName: string;
  fields: {
    Header?: Field<string>;
    Filters: FilterOption[];
  };
}

export interface FilterCategoryJson {
  header: Field<string>;
  filters: { targetItems: FilterOptionJson[] };
}

export interface Fields {
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
  CTACardText?: Field<string>;
}

export type ApiSearchProps = {
  params?: Params;
  fields?: Fields;
  fallbackData?: ApiResponse;
};

export interface ApiSearchPropsJson {
  heading?: { jsonValue: Field<string> };
  title?: { jsonValue: Field<string> };
  text?: { jsonValue: Field<string> };
  searchPlaceholder?: Field<string>;
  filterOptionsIcon?: HCAIconFields;
  filterOptionsText?: Field<string>;
  filterOptions?: { targetItems: FilterCategoryJson[] };
  sortOptionsIcon?: HCAIconFields;
  sortOptionsText?: Field<string>;
  sortOptions?: { targetItems: FilterOptionJson[] };
  searchResultsText?: Field<string>;
  searchResultsTextWithInput?: Field<string>;
  resultsPerPage?: Field<number>;
  searchBy?: { targetItems: FilterOptionJson[] };
  filterBy?: { targetItems: FilterOptionJson[] };
  gridViewIcon?: HCAIconFields;
  gridViewText?: Field<string>;
  mapViewIcon?: HCAIconFields;
  mapViewText?: Field<string>;
  getDirectionsText?: Field<string>;
  cTACardText?: Field<string>;
}

export interface ApiSearchPropsJson {
  params?: Params;
  fields?: {
    data?: {
      item?: ApiSearchPropsJson;
    };
  };
  fallbackData?: ApiResponse;
}
