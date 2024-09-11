import { Field, LinkFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export interface Fields {
  data?: {
    contextItem?: {
      jobFamily?: { value?: string };
    };
    item?: {
      title?: { jsonValue?: Field<string> };
      selectAJobAreaLabel?: { value?: string };
      selectALocationLabel?: { value?: string };
      readMoreCtaText?: { value?: string };
      viewAllVacanciesCTA: { jsonValue: { value: LinkFieldValue } };
    };
  };
}

export type CareersLatestVacanciesProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};
