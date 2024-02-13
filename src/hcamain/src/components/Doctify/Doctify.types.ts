import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface DoctifyLogoFields {
  fields: {
    Text: Field<string>;
    Logo: ImageField;
  };
}

export interface DoctifyReviewsFields {
  fields: {
    Stars: Field<string>;
    Reviews: Field<string>;
    DoctifyLogoLight: DoctifyLogoFields;
    DoctifyLogoDark: DoctifyLogoFields;
    Link: LinkField;
  };
}

export interface Fields {
  Reviews: DoctifyReviewsFields;
}

export type DoctifyProps = {
  params: { [key: string]: string };
  fields: Fields;
  alignment?: 'left' | 'right' | 'centre';
};
