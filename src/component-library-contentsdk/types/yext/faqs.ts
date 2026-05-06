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

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

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

export default interface Faq {
  answer?: string;
  answerV2?: unknown;
  landingPageUrl?: string;
  c_uRL?: string;
  nudgeEnabled?: boolean;
  primaryConversationContact?: unknown;
  question: string;
  slug?: string;
  logo?: ComplexImage;
  name: string;
  c_activeInSearch?: boolean;
  c_answersPrimaryCallToAction?: C_answersPrimaryCallToAction;
  c_answersSecondaryCallToAction?: C_answersSecondaryCallToAction;
  c_linkedLocationFAQSection?: EntityReference[];
  c_micrositeBrand?: C_micrositeBrand[];
  c_contentGenTest?: string;
  keywords?: string[];
  id: string;
  timezone?: unknown;
}
