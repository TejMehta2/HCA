import { LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
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
export interface ApiFields {
  id: string;
  name: string;
  area?: string;
  subArea?: string | null;
  extras?: { id: string; name: string; duration: string; price: string }[];
}

export type GroupedScans = Record<string, TbcDropdownColumn[]>;

export interface TbcDropdownColumn {
  title?: string;
  scans: ApiFields[];
}

export type TbcBookingScansSearchProps = ComponentWithContextProps & {
  params?: Params;
  fields: Fields;
};

export interface TbcServiceExtra {
  id: string;
  name: string;
  price: string; // Can be a number or percentage (e.g., "50%" or "60")
  duration: string; // Minutes
}

export interface TbcService {
  id: string;
  serviceName: {
    value: string;
  };
  area: {
    targetItem: {
      id: string;
      medicalAreaName: {
        value: string;
      };
    };
  };
  extras: {
    targetItems: TbcServiceExtra[];
  };
}

export interface TbcServicesFolder {
  targetItem: {
    id: string;
    children: {
      results: TbcService[];
    };
  };
}
