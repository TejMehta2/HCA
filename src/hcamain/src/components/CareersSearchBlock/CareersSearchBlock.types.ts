import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import { YextFacetJson } from 'src/types/searchProps';

export interface Fields {
  data?: {
    item?: {
      searchPhrasePlaceholder?: { value?: string };
      selectAJobAreaLabel?: { value?: string };
      selectALocationLabel?: { value?: string };
      filtersCtaLabel?: { value?: string };
      searchRolesCTA: { jsonValue?: LinkField };
      filters?: { targetItems?: YextFacetJson[] };
    };
  };
}

export type CareersSearchBlockProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};
