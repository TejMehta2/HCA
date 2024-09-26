import { Field, LinkFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export interface Fields {
  data?: {
    item?: {
      title?: { jsonValue?: Field<string> };
      searchConfiguration?: { targetItem: CareersLatestVacanciesConfiguration };
      jobFamilies?: { targetItems?: GeneralSetting[] };
    };
  };
}

export interface CareersLatestVacanciesConfiguration {
  selectAJobAreaLabel?: { value?: string };
  selectALocationLabel?: { value?: string };
  readMoreCtaText?: { value?: string };
  viewAllVacanciesCTA: { jsonValue: { value: LinkFieldValue } };
}

export interface GeneralSetting {
  key?: { value?: string };
  value?: { value?: string };
}

export type CareersLatestVacanciesProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};
