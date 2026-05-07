import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import Params from 'src/types/params';
import { ComponentWithContextProps } from 'lib/component-props';

export interface DoctifyLogoFieldsGraphQl {
  text?: Field<string>;
  logo: { jsonValue?: ImageField; value?: string };
}

export interface DoctifyReviewsFieldsGraphQl {
  stars?: Field<string>;
  reviews?: Field<string>;
  doctifyLogoLight?: { targetItem: DoctifyLogoFieldsGraphQl };
  doctifyLogoDark?: { targetItem: DoctifyLogoFieldsGraphQl };
  link?: { jsonValue?: LinkField };
}

export interface FieldsGraphQl {
  Reviews?: { targetItem: DoctifyReviewsFieldsGraphQl };
}

export type DoctifyPropsGraphQl = ComponentWithContextProps & {
  params?: Params;
  fields?: {
    data?: {
      item?: FieldsGraphQl;
    };
  };
  alignment?: 'left' | 'right' | 'centre';
};
