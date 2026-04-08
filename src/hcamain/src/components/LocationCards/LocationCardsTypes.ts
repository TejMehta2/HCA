import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ApiSearchProps } from 'src/types/searchProps';
import Params from 'src/types/params';
import { Coordinate } from 'components/LocationsSearch/LocationsSearch.types';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type FilterOptionFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { targetItem: { id: string } };
};

type LocationsFields = {
  abstractTitle?: { value?: string };
  abstractImage?: { jsonValue?: ImageField };
  title?: { value?: string };
  image?: { jsonValue?: ImageField };
  city?: { value?: string };
  addressLine1?: { value?: string };
  addressLine2?: { value?: string };
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
      cTALink: { jsonValue: LinkField };
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
      locations?: {
        targetItems?: LocationsFields[];
      };
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
  primaryImageUrl: string;
  abstractImageUrl: string;
  geocodedCoordinate: Coordinate;
  googlePlaceId: string;
};

export type StaticProps = {
  ctaQuery: string;
  Locations: Location[];
};
