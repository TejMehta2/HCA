import { Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';
import { HeadingSize, HeadingTag, Theme } from 'src/types/params';

export interface TestsAndScansResponse {
  scans: {
    Description: string;
    Image: string;
    Title: string;
  }[];
}

export type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

export type FilterOptionsFields = Item & {
  fields: {
    Header: Field<string>;
    Filters: SortOptionsFields[];
  };
};

export type SortOptionsFields = Item & {
  fields: {
    DisplayName: Field<string>;
    Filter: Field<string>;
  };
};

export interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
  SearchPlaceholder: Field<string>;
  FilterOptionsIcon: HCAIconFields;
  FilterOptionsText: Field<string>;
  FilterOptions: FilterOptionsFields[];
  SortOptionsIcon: HCAIconFields;
  SortOptionsText: Field<string>;
  SortOptions: SortOptionsFields[];
  SearchResultsText: Field<string>;
  ResultsPerPage: Field<string>;
  SearchBy: SortOptionsFields[];
  FilterBy: SortOptionsFields[];
}

export type TestAndScansSearchProps = {
  params: {
    [key: string]: string;
    HeadingSize: HeadingSize;
    HeadingTag: HeadingTag;
    Theme: Theme;
  };
  fields: Fields;
};
