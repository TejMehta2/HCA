import {
  Field,
  ImageField,
  LinkField,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

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
  directions: string;
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

export type LocationsFields = {
  title?: { value?: string };
  image?: { value?: ImageField };
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

export type LocationCardsProps = {
  params?: Params;
  fields?: Fields;
  fallbackData?: SearchResponse;
};
