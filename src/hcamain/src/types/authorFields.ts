import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface AuthorFields {
  fields?: {
    Name?: Field<string>;
    Position?: Field<string>;
    Avatar?: ImageField;
    Link?: LinkField;
    PositionLink?: LinkField;
  };
}
