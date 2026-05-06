/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, type JSX } from 'react';

export interface MultiplePhoneNumbersProps {
  children?: ReactNode | JSX.Element;
  practices: any;
  title: string;
  defaultNumber: string;
  doctifyPhoneSlugs?: string[];
  slug: string;
  isDoctifyPhoneNumberConsultant?: boolean;
}
