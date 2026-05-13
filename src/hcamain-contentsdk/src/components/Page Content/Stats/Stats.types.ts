import { Field } from '@sitecore-content-sdk/nextjs';
import Params from 'src/types/params';

export interface Fields {
  Title?: Field<string>;
  Text?: Field<string>;
  Counters?: CountersFields[];
}

interface CountersFields {
  fields?: {
    Number?: Field<string>;
    Text?: Field<string>;
  };
}

export type StatsProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};
