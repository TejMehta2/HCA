import { ReactNode, type JSX } from 'react';

export interface ProfilePageHeaderProps {
  children: ReactNode | JSX.Element;
  image: string | null;
  name: string;
  topSpecialty: string;
  infoBoxText: string;
  overallExperienceYears: number;
  overallExperienceYearsText: string;
  infoBoxIcon?: ReactNode | JSX.Element;
}
