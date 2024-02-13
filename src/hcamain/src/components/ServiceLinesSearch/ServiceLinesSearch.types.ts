import { Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';
import { HeadingSize, HeadingTag, Theme } from 'src/types/params';

export interface ServiceLinesResponse {
  serviceLines: {
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

export type FilterOptionFields = Item & {
  fields: {
    Header: Field<string>;
    Filter: Field<string>;
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
  ResultsPerPage: Field<number>;
  SearchBy: SortOptionsFields[];
  FilterBy: FilterOptionFields[];
}

export type ServiceLinesSearchProps = {
  params: {
    headingSize: HeadingSize;
    headingTag: HeadingTag;
    theme: Theme;
    [key: string]: string;
  };
  fields: Fields;
};
