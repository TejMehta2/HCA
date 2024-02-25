import { ReactNode } from 'react';

export interface ProfilePageHeaderProps {
  image: string;
  name: string;
  topSpecialty: string;
  infoBoxText: string;
  infoBoxIcon?: ReactNode | JSX.Element;
}
