import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
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

export type JobDetailsHeaderProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};

export interface JobsResponse {
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
