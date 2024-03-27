import {
  Field,
  LinkField,
  ImageField,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import { BlogResponse } from '../BlogSearch/BlogSearch.types';

export type CTAIconFields = {
  svgMarkup?: Field<string>;
};

export type SortOptionsFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterString?: { value?: string };
  filterValueGuid?: { jsonValue?: Item };
};

export type BlogPageFields = {
  abstractTitle?: Field<string>;
  abstractText?: Field<string>;
  abstractImage?: { jsonValue: ImageField };
  date?: { jsonValue: Field<string> };
  articleType?: { targetItem?: ArticleTypeFields };
  url?: { path: string };
};

export type ArticleTypeFields = {
  id?: string;
  title?: { value?: string };
};

export interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      articles?: {
        ArticlesList?: BlogPageFields[];
      };
      searchBy?: {
        SearchByList?: SortOptionsFields[];
      };
      filterOptions?: {
        FilterByList?: SortOptionsFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      blogUrl?: { jsonValue?: LinkField };
    };
    contextItem?: {
      category?: { category: { id: string }[] };
    };
  };
}

export type BlogRelatedArticlesProps = {
  params: Params;
  fields: Fields;
  fallbackData: BlogResponse;
  rendering: { uid: string };
};
