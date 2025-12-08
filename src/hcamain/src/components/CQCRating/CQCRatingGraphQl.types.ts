import {
  Field,
  ImageField,
  Item,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export type logoFieldGraphQl = {
  logo: { jsonValue?: ImageField; value?: string };
};

export type CQSStatusFieldsGraphQl = Item & {
  displayName?: string;
  title?: { jsonValue: Field<string> };
  icon?: { jsonValue: Field<string> };
  logo?: { jsonValue: ImageField };
  cQCLogoLight?: {
    targetItem?: logoFieldGraphQl;
  };
  cQCLogoDark?: {
    targetItem?: logoFieldGraphQl;
  };
};

export interface CQCFieldsGraphQl {
  status?: { targetItem: CQSStatusFieldsGraphQl };
  reportLink?: { jsonValue: LinkField };
  text?: { jsonValue: Field<string> };
  title?: { jsonValue: Field<string> };
}

export type CQCRatingProps = {
  params?: Params;
  fields?: {
    data?: {
      item?: CQCFieldsGraphQl;
    };
  };
  hideRating?: boolean;
  length?: 'long' | 'short';
};
