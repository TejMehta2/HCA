import {
  ImageField,
  RouteData,
} from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import Params from 'src/types/params';

export interface Fields {
  data?: {
    contextItem?: {
      image?: { jsonValue?: ImageField };
    };
    item?: {
      headerImageMapping?: { targetItems: MappingFields[] };
    };
  };
}

interface MappingFields {
  jobArea?: {
    targetItem?: {
      value?: { value: string };
    };
  };
  image?: { jsonValue: ImageField };
}

export type JobDetailsHeaderProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};

export interface VacancyResponse {
  applicationUrl: string;
  contractType?: string | null;
  createdDateTimeISO?: string;
  datePosted?: string;
  employmentType: string;
  id: string;
  jobAreas: string[];
  jobCity: string;
  jobFamily?: string;
  jobFamilyGroup: string;
  jobFamilyNameforJobProfile: string;
  jobFunction: string;
  jobLocation: string;
  jobProfile: string;
  landingPageUrl: string;
  name: string;
  richDescription: {
    html: string;
  };
  bodyPlain: string;
  startDate: string;
  uid: number;
  workerSubType: string;
}

export type VacancyRoute = RouteData & {
  vacancy?: VacancyResponse;
};
