import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

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
    FilterValueGuid?: Field<string> & {
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

  BlogUrl?: LinkField;
}

export type BlogPageHeaderProps = {
  params?: Params;
  fields?: Fields;
};
