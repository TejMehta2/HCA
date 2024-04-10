import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ApiSearchProps } from 'src/types/searchProps';
import Params from 'src/types/params';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type FilterOptionFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { id: string };
};

type LocationsFields = {
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
    contextItemSearchIdParams?: {
      treatmentId?: string;
      serviceLineId?: string;
      scanId?: string;
      conditionId?: string;
    };
    contextItemSearchParams: {
      [key: string]: { value?: string };
    };
  };
}

export type LocationCardsProps = ApiSearchProps & {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};

export type LocationCardsResult = {
  data: Location[];
};

export type Location = {
  id: number;
  title: string;
  name: string;
  description: string;
  imageUrl: string;
  url: string;
  directions: string;
};

export type StaticProps = {
  ctaQuery: string;
  Locations: Location[];
};
