import { LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
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

export type CareersSearchBlockProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};
