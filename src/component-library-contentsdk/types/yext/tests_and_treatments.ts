export enum LinkType {
  OTHER = 'Other',
  URL = 'URL',
  PHONE = 'Phone',
  EMAIL = 'Email',
}

export interface C_answersPrimaryCallToAction {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface C_answersSecondaryCallToAction {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface EntityReference {
  entityId: string;
  name: string;
}

export enum C_micrositeBrand {
  BRAND_A = 'Brand A',
  BRAND_B = 'Brand B',
  BRAND_C = 'Brand C',
}

export interface C_servicesCTAButton {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export enum C_testAndTreatmentCategory {
  TESTS = 'Tests',
  TREATMENTS = 'Treatments',
  CONDITIONS = 'Conditions',
}

export default interface Ce_testTreatment {
  landingPageUrl?: string;
  c_uRL?: string;
  description?: string;
  name: string;
  c_activeInSearch?: boolean;
  c_answersPrimaryCallToAction?: C_answersPrimaryCallToAction;
  c_answersSecondaryCallToAction?: C_answersSecondaryCallToAction;
  c_body?: string;
  s_snippet?: string;
  c_linkedFacilitiesTestField?: string[];
  c_linkedLocationPageServicesSection?: EntityReference[];
  c_linkedLocationSpecialtiesAndTestTreatments?: EntityReference[];
  c_micrositeBrand?: C_micrositeBrand[];
  c_searchKeywords?: string[];
  c_servicesCTAButton?: C_servicesCTAButton;
  c_servicesImage?: Image;
  c_contentGenTest?: string;
  c_testAndTreatmentCategory?: C_testAndTreatmentCategory;
  id: string;
}
