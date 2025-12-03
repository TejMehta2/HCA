import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export interface TestsAndScansResponse {
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
    Header?: Field<string>;
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
}

export type TestsAndScansSearchProps = {
  params?: Params;
  fields?: Fields;
  fallbackData?: TestsAndScansResponse;
};
