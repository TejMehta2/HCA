import { ReactNode } from 'react';

export interface NeedHelpProps {
  children?: ReactNode | JSX.Element;
  headline: string;
  subheadline: string | JSX.Element;
  workingHoursHeadline: string;
  workingHours: string | JSX.Element;
  workingHoursTime: string;
  phoneNumber: string;
}
