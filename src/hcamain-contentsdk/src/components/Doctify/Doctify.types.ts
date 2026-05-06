import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs'
import Params from 'src/types/params';

export interface DoctifyLogoFields {
  fields?: {
    Text?: Field<string>;
    Logo: { fields?: ImageField; value?: string };
  };
}

export interface DoctifyReviewsFields {
  fields?: {
    Stars?: Field<string>;
    Reviews?: Field<string>;
    DoctifyLogoLight?: DoctifyLogoFields;
    DoctifyLogoDark?: DoctifyLogoFields;
    Link?: { fields?: LinkField; url: string };
  };
}

export interface Fields {
  Reviews?: DoctifyReviewsFields;
}

export type DoctifyProps = {
  params?: Params;
  fields?: Fields;
  alignment?: 'left' | 'right' | 'centre';
};
