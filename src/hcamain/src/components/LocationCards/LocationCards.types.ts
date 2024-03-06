import {
  ComponentRendering,
  ComponentFields,
  Field,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

export type FilterOptionFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValue?: { value?: string };
};

type LocationsFields = {
  title?: { value?: string };
  image?: { jsonValue?: ImageField };
  city?: { value?: string };
  street?: { value?: string };
  postCode?: { value?: string };
  getDirections?: { value?: string };
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
        LocationsList?: LocationsFields[];
      };
      filterOptions?: {
        filterOptionsList?: FilterOptionFields[];
      };
      cTAText?: { jsonValue?: Field<string> };
      getDirectionsText?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      id?: string;
    };
  };
}

type LocationCardsProps = {
  params?: Params;
  fields?: Fields;
};
