import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export interface Fields {
  data?: {
    item?: {
      searchPhrasePlaceholder?: { value?: string };
      extrasLabel?: { value?: string };
      startBookingCTA: { jsonValue?: LinkField };
    };
  };
}

export type TbcBookingScansSearchProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};
