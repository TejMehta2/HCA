import { ReactNode } from 'react';

export interface NeedHelpProps {
  children?: ReactNode | JSX.Element;
  headline: string;
  subheadline: string;
  workingHoursHeadline: string;
  workingHours: string;
  workingHoursTime: string;
  phoneNumber: string;
}
