import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';

export interface AuthorFields {
  fields?: {
    Name?: Field<string>;
    Position?: Field<string>;
    Avatar?: ImageField;
    Link?: LinkField;
    PositionLink?: LinkField;
  };
}
