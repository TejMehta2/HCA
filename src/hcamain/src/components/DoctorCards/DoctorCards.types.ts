import {
  ComponentRendering,
  ComponentFields,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type Doctor = {
  total: number;
  rows: DoctorRow[];
};

export type DoctorRow = {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  images: {
    images: string[];
    original: string;
    logo: string;
  };
  about: string;
  title: string;
  suffix: string;
  education: string;
  gender: string;
  videoConsultation: boolean;
  medicalProcedures: string;
  specialInterests: string;
  languages: Language[];
  registrationBodies: RegistrationBody[];
  keywords: Keyword[];
  practices: Practice[];
  peerRecommendationsCount: number;
  reviewsTotal: number;
  overallExperience: number;
  explanation: number;
  bedsideManner: number;
  averageRating: number;
  customFields: {
    about: string;
    rating: number;
    searchEnabled: boolean;
  };
  yearsAsSpecialist: string;
  yearsOfExperience: string;
  distance: number;
  hideAppointmentRequest: boolean;
  patientsChildren: boolean;
};

type Language = {
  isoCode: string;
  name: string;
  id: number;
};

type RegistrationBody = {
  id: number;
  name: string;
  registrationNumber: string;
};

type Keyword = {
  id: number;
  keywordType: string;
  name: string;
  parentId: number;
  parentName: string;
  directLink: boolean;
};

type Practice = {
  id: number;
  name: string;
  slug: string;
  images: {
    cover: string;
    images: string[];
    logo: string;
  };
  address: {
    id: number;
    geolocation: {
      lon: number;
      lat: number;
    };
    googlePlaceId: string;
    primary: boolean;
    postcode: string;
    street1: string;
    street2: string;
    city: string;
    country: string;
    county: string;
  };
  isPublicSystem: boolean;
  phone: string[];
  hasEmail: boolean;
  slots: [];
};

export type FilterField = {
  displayName: string;
  id: string;
  url: string;
  name: string;
  fields: {
    Filter: {
      value: string;
    };
  };
};

export interface ComponentFieldsDocCards extends ComponentFields {
  NumberOfCards: {
    value: string;
  };
  apiData: Field<Doctor>;
  CustomFilters: FilterField[];
}

export interface ComponentRenderingDocCards extends ComponentRendering {
  componentName: string;
  fields: ComponentFieldsDocCards;
}
