import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

export interface Fields {
  data?: {
    item?: {
      searchPhrasePlaceholder?: { value?: string };
      extrasLabel?: { value?: string };
      startBookingCTA: { jsonValue?: LinkField };
      servicesFolder: TbcServicesFolder;
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

export interface TbcServiceExtra {
  id: string;
  serviceExtraName: {
    value: string;
  };
  price: {
    value: string; // Can be a number or percentage (e.g., "50%" or "60")
  };
  duration: {
    value: string; // Minutes
  };
}

export interface TbcService {
  id: string;
  serviceName: {
    value: string;
  };
  extras: {
    targetItems: TbcServiceExtra[];
  };
}

export interface TbcServicesFolder {
  targetItem: {
    children: {
      results: TbcService[];
    };
  };
}
