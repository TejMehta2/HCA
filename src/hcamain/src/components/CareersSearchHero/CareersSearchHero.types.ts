import {
  Field,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import { YextFacetJson } from 'src/types/searchProps';

export interface Fields {
  data?: {
    contextItem?: {
      subHeading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
    };
    item?: {
      searchPhrasePlaceholder?: { value?: string };
      selectAJobAreaLabel?: { value?: string };
      selectALocationLabel?: { value?: string };
      filtersCtaLabel?: { value?: string };
      searchRolesCTA?: { jsonValue?: LinkField };
      filters?: { targetItems?: YextFacetJson[] };
    };
  };
}

export type CareersSearchHeroProps = {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
  facets: JobsResponse['response']['facets'];
};

export interface JobsResponse {
  meta: unknown;
  response: {
    businessId: number;
    queryId: string;
    resultsCount: number;
    results: {
      data: {
        id: string;
        type: string;
        employmentType: string;
        name: string;
        uid: number;
        jobCity: string;
        jobLocation: string;
        landingPageUrl: null;
        applicationUrl: null;
        body: string;
        jobFunction: string;
      };
      highlightedFields: {
        name: null;
        description: null;
        title: null;
      };
    }[];
    appliedQueryFilters: unknown[];
    facets: {
      fieldId: string;
      count: number;
      displayName: string;
      options: {
        displayName: string;
        count: 23;
        selected: boolean;
        filter: {
          c_jobLocation: {
            $eq: string;
          };
        };
      }[];
    }[];
    source: string;
    searchIntents: unknown[];
    locationBias: {
      latitude: number;
      longitude: number;
      locationDisplayName: string;
      accuracy: string;
    };
  };
}
