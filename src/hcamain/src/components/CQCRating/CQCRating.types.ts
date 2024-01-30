import {
  Field,
  ImageField,
  Item,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type logoField = {
  Logo: ImageField;
};

export type CQSStatusFields = Item & {
  displayName: string;
  fields: {
    Title: Field<string>;
    Icon: Field<string>;
    Logo: ImageField;
    CQCLogoLight: {
      fields: logoField;
    };
    CQCLogoDark: {
      fields: logoField;
    };
  };
};

export interface Fields {
  Status: CQSStatusFields;
  ReportLink: LinkField;
  Text?: Field<string>;
  Title?: Field<string>;
}

export type CQCRatingProps = {
  params?: { [key: string]: string };
  fields: Fields;
  hideRating?: boolean;
  length?: 'long' | 'short';
};
