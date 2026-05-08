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
  employmentType: string;
  jobAreas: string[];
  jobFamilyGroup: string;
  jobFamilyNameforJobProfile: string;
  jobFunction: string;
  jobLocation: string;
  jobCity: string;
  jobProfile: string;
  richDescription: {
    html: string;
  };
  bodyPlain: string;
  startDate: string;
  workerSubType: string;
  id: string;
  name: string;
  uid: number;
  landingPageUrl: string;
  applicationUrl: string;
}

export type VacancyRoute = RouteData & {
  vacancy?: VacancyResponse;
};
