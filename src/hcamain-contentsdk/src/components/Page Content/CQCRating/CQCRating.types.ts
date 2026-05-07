import {
  Field,
  ImageField,
  Item,
  LinkField,
} from '@sitecore-content-sdk/nextjs'
import Params from 'src/types/params';
import { ComponentWithContextProps } from 'lib/component-props';

export type logoField = {
  Logo: { fields?: ImageField; value?: string };
};

export type CQSStatusFields = Item & {
  displayName?: string;
  fields?: {
    Title?: Field<string>;
    Icon?: Field<string>;
    Logo?: ImageField;
    CQCLogoLight?: {
      fields?: logoField;
    };
    CQCLogoDark?: {
      fields?: logoField;
    };
  };
};

export interface Fields {
  Status?: CQSStatusFields;
  ReportLink?: LinkField;
  Text?: Field<string>;
  Title?: Field<string>;
}

export type CQCRatingProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  hideRating?: boolean;
  length?: 'long' | 'short';
};
