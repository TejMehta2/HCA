import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import Params from 'src/types/params';
import { ConsultantExtract as Consultant } from './response.types';
import { ComponentWithContextProps } from 'lib/component-props';

export type FilterField = {
  displayName?: string;
  id?: string;
  url?: string;
  name?: string;
  fields?: {
    Filter?: {
      value?: string;
    };
  };
};

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

export type ConsultantsFields = {
  displayName?: string;
  doctifySlug?: { value?: string };
  onlineBooking?: { value?: string };
};

export type PracticeFields = {
  title?: { value?: string };
  description?: { value?: string };
  image?: { jsonValue: ImageField };
  doctifyPractice?: { value?: string };
  practice?: { value?: string };
};

export type ServiceFields = {
  title?: { value?: string };
  description?: { value?: string };
  image?: { jsonValue: ImageField };
  doctifyKeywordId?: { value?: string };
  keywordId?: { value?: string };
};

export type FiltersFields = {
  filter?: { value?: string };
  filterValueString?: { value?: string };
};

export interface Fields {
  data?: {
    item?: {
      title?: { jsonValue?: Field<string> };
      numberOfCards?: { jsonValue?: Field<string> };
      cTACard?: { jsonValue?: LinkField };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      consultants?: {
        ConsultantsList: ConsultantsFields[];
      };
      practice?: {
        PracticeList: PracticeFields[];
      };
      service?: {
        ServicesList: ServiceFields[];
      };
      customFilters?: {
        CustomFiltersList: FiltersFields[];
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

export type StaticProps = {
  apiUrl?: string;
  ctaQuery?: string;
  consultants?: Consultant[];
};

export type DoctorCardsProps = ComponentWithContextProps & StaticProps & {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};
