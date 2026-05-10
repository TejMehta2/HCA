import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';

export interface AuthorFields {
  name?: { jsonValue: Field<string> };
  position?: { jsonValue: Field<string> };
  avatar?: { jsonValue: ImageField };
  link?: { jsonValue: LinkField };
  positionLink?: { jsonValue: LinkField };
}
