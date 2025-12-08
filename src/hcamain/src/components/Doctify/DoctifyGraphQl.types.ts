import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export interface DoctifyLogoFieldsGraphQl {
  text?: { jsonValue: Field<string> };
  logo: { jsonValue?: ImageField; value?: string };
}

export interface DoctifyReviewsFieldsGraphQl {
  stars?: { jsonValue: Field<string> };
  reviews?: { jsonValue: Field<string> };
  doctifyLogoLight?: { targetItem: DoctifyLogoFieldsGraphQl };
  doctifyLogoDark?: { targetItem: DoctifyLogoFieldsGraphQl };
  link?: { jsonValue?: LinkField };
}

export interface FieldsGraphQl {
  Reviews?: { targetItem: DoctifyReviewsFieldsGraphQl };
}

export type DoctifyPropsGraphQl = {
  params?: Params;
  fields?: {
    data?: {
      item?: FieldsGraphQl;
    };
  };
  alignment?: 'left' | 'right' | 'centre';
};
