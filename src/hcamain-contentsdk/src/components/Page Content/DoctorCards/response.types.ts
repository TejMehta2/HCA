export interface SearchResponse {
  total: number;
  rows: Consultant[];
}

export type FindResponse = Consultant[];

export interface ConsultantExtract {
  images: Images;
  title: Title;
  firstName: string;
  lastName: string;
  slug: string;
  keywords: Keyword[];
}

export interface Consultant {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  images: Images;
  about: string;
  title: Title;
  suffix: string;
  education: string;
  gender: Gender;
  videoConsultation: boolean;
  medicalProcedures: null | string;
  specialInterests: null | string;
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
  customFields: CustomFields;
  yearsAsSpecialist: string;
  yearsOfExperience: string;
  distance: number;
  hideAppointmentRequest: boolean;
  patientsChildren: boolean;
}

export interface CustomFields {
  about: string;
  rating: number;
  searchEnabled: boolean;
  psg?: boolean;
}

export enum Gender {
  Male = 'male',
}

export interface Images {
  images?: string[];
  logo?: string;
  original?: string;
  cover?: string;
}

export interface Keyword {
  id: number;
  keywordType: KeywordType;
  name: string;
  parentId: number;
  parentName: string;
  directLink: boolean;
}

export enum KeywordType {
  Condition = 'condition',
  Procedure = 'procedure',
  Specialty = 'specialty',
}

export interface Language {
  isoCode: string;
  name: string;
  id: number;
}

export interface Practice {
  id: number;
  name: string;
  slug: string;
  images: Images;
  address: Address;
  isPublicSystem: boolean;
  phone: string[];
  hasEmail: boolean;
  slots: unknown[];
}

export interface Address {
  id: number;
  geolocation: Geolocation;
  googlePlaceId: string;
  primary: boolean;
  postcode: string;
  street1: string;
  street2: string;
  city: City;
  country: Country;
  county: City;
}

export enum City {
  Elstree = 'Elstree',
  Empty = '',
  GreaterLondon = 'Greater London',
  London = 'London',
}

export enum Country {
  UnitedKingdom = 'United Kingdom',
}

export interface Geolocation {
  lon: number;
  lat: number;
}

export interface RegistrationBody {
  id: number;
  name: Name;
  registrationNumber: string;
}

export enum Name {
  GeneralMedicalCouncil = 'General Medical Council',
  RoyalCollegeOfObstetricsAndGynaecologist = 'Royal College of Obstetrics and Gynaecologist',
}

export enum Title {
  DR = 'Dr',
  Mr = 'Mr',
  Professor = 'Professor',
}
