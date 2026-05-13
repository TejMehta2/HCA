import {
  Field,
  LinkFieldValue,
  ImageField,
} from '@sitecore-content-sdk/nextjs';
import Params from 'src/types/params';
import { ApiSearchProps } from 'src/types/searchProps';
import { ComponentWithContextProps } from 'lib/component-props';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type FilterOptionsFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { targetItem: { id: string } };
};

type PatientStoriesFields = {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue?: ImageField };
  url?: { path?: string };
};

export type FiltersFields = {
  filter?: { value?: string };
  filterValueString?: { value?: string };
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
      cTALink: { jsonValue: { value: LinkFieldValue } };
      patientStories?: {
        PatientStoriesList?: PatientStoriesFields[];
      };
      numberOfCards?: { jsonValue?: Field<string> };
      cTAText?: { jsonValue?: Field<string> };
      searchOptions?: {
        SearchOptionsList?: FilterOptionsFields[];
      };
      filterOptions?: {
        filterOptionsList?: FilterOptionsFields[];
      };
    };
    contextItemSearchParams: {
      [key: string]: { value?: string };
    };
    contextItemSearchIdParams: {
      [key: string]: string;
    };
  };
}

export type PatientStoriesCardsProps = ApiSearchProps & ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};

export type patientStoriesResult = {
  data: patientStories[];
};

export type patientStories = {
  id: number;
  title: string;
  name: string;
  description: string;
  imageUrl: string;
  url: string;
  pageId: string;
  abstractTitle?: string;
  abstractImageUrl: string;
  abstractText?: string;
  primaryImageUrl: string;
};

export type StaticProps = {
  ctaQuery: string;
  patientStories: patientStories[];
};
