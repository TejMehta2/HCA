import {
  Field,
  ImageField,
  Item,
  LinkField,
} from '@sitecore-content-sdk/nextjs'
import Params from 'src/types/params';

export type logoFieldGraphQl = {
  logo: { jsonValue?: ImageField; value?: string };
};

export type CQSStatusFieldsGraphQl = Item & {
  displayName?: string;
  title?: Field<string>;
  icon?: Field<string>;
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
  text?: Field<string>;
  title?: Field<string>;
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
