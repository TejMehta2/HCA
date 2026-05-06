import { ReactNode, type JSX } from 'react';

export interface YextSearchProps {
  children?: ReactNode | JSX.Element;
}

export type VerticalKey =
  | 'all'
  | 'healthcare_facilities'
  | 'tests_and_treatments'
  | 'healthcare_professionals'
  | 'specialties'
  | 'articles'
  | 'faqs'
  | 'jobs'
  | 'links'
  | 'conditions';

export type VerticalLabel =
  | 'All'
  | 'Locations'
  | 'Tests & Treatments'
  | 'Consultants'
  | 'Departments'
  | 'Articles'
  | 'FAQs'
  | 'Vacancies'
  | 'Links'
  | 'Conditions';

export type VerticalData = {
  key: VerticalKey;
  label: VerticalLabel;
  component: JSX.Element;
}[];
