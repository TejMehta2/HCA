import { BaseYextEntity } from './baseYextEntity';

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

export enum C_articleCategory {
  BLOG_POST = 'Blog Post',
  PATIENT_STORY = 'Patient Story',
  YOUTUBE_VIDEO = 'Youtube Video',
}

export interface C_articleCTAButton {
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

export interface Ce_patientStory extends BaseYextEntity {
  landingPageUrl?: string;
  description?: string;
  c_activeInSearch?: boolean;
  c_answersPrimaryCallToAction?: C_answersPrimaryCallToAction;
  c_answersSecondaryCallToAction?: C_answersSecondaryCallToAction;
  c_articleCategory?: C_articleCategory;
  c_articleCTAButton?: C_articleCTAButton;
  c_linkedLocationPageArticlesSection?: EntityReference[];
  c_micrositeBrand?: C_micrositeBrand[];
  c_nameRichText?: string;
  c_primaryImage?: Image;
  c_servicesImage?: Image;
  c_subtitle?: string;
  c_contentGenTest?: string;
  keywords?: string[];
}

export interface Ce_youtubeVideo {
  richTextDescription?: string;
  name: string;
  c_activeInSearch?: boolean;
  c_answersPrimaryCallToAction?: C_answersPrimaryCallToAction;
  c_answersSecondaryCallToAction?: C_answersSecondaryCallToAction;
  c_articleCategory?: C_articleCategory;
  c_body?: string;
  c_fullBodyText?: string;
  c_image?: Image;
  c_nameRichText?: string;
  c_primaryImage?: Image;
  c_searchKeywords?: string[];
  c_subtitle?: string;
  c_contentGenTest?: string;
  keywords?: string[];
  id: string;
}

export interface Ce_blogPost extends BaseYextEntity {
  landingPageUrl?: string;
  description?: string;
  c_activeInSearch?: boolean;
  c_answersPrimaryCallToAction?: C_answersPrimaryCallToAction;
  c_answersSecondaryCallToAction?: C_answersSecondaryCallToAction;
  c_articleCategory?: C_articleCategory;
  c_articleCTAButton?: C_articleCTAButton;
  c_linkedLocationPageArticlesSection?: EntityReference[];
  c_nameRichText?: string;
  c_primaryImage?: Image;
  c_servicesImage?: Image;
  c_subtitle?: string;
  c_contentGenTest?: string;
  keywords?: string[];
}
