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

export interface C_answersTertiaryCallToAction {
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

export default interface Ce_promo {
  name: string;
  c_activeInSearch?: boolean;
  c_answersPrimaryCallToAction?: C_answersPrimaryCallToAction;
  c_answersSecondaryCallToAction?: C_answersSecondaryCallToAction;
  c_answersTertiaryCallToAction?: C_answersTertiaryCallToAction;
  c_backgroundImageForDesktop?: Image;
  c_backgroundImageForMobile?: Image;
  c_body?: string;
  c_image?: Image;
  c_mobileImageForPromoCard?: Image;
  c_searchKeywords?: string[];
  c_contentGenTest?: string;
  id: string;
}
