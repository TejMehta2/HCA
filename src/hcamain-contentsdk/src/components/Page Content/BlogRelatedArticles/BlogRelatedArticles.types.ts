import {
  Field,
  LinkField,
  ImageField,
  Item,
} from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import Params from 'src/types/params';
//import { BlogResponse } from '../BlogSearch/BlogSearch.types';
import { ApiSearchProps } from 'src/types/searchProps';

export type CTAIconFields = {
  svgMarkup?: Field<string>;
};

export type SortOptionsFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterString?: { value?: string };
  filterValueGuid?: { jsonValue?: Item };
};

type FilterOptionsFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { targetItem: { id: string } };
};

export type BlogPageFields = {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
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
      cTALink: { jsonValue: LinkField };
      articles?: {
        ArticlesList?: BlogPageFields[];
      };
      searchBy?: {
        SearchByList?: SortOptionsFields[];
      };

      filterBy?: {
        FilterByList?: FilterOptionsFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      blogUrl?: { jsonValue?: LinkField };
    };
    contextItemSearchParams: {
      [key: string]: { value?: string };
    };
    contextItemSearchIdParams: {
      [key: string]: string;
    };
  };
}

export type BlogRelatedArticlesProps = ComponentWithContextProps & ApiSearchProps & {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};

export type BlogRelatedArticlesResult = {
  data: BlogRelatedArticles[];
};

export type BlogRelatedArticles = {
  id: number;
  abstractTitle: string;
  abstractText: string;
  title: string;
  name: string;
  description: string;
  imageUrl: string;
  primaryImageUrl: string;
  abstractImageUrl: string;
  url: string;
  date: string;
  typeName: string;
  typeId: string;
  pageId: string;
};

export type StaticProps = {
  ctaQuery: string;
  BlogRelatedArticles: BlogRelatedArticles[];
};
