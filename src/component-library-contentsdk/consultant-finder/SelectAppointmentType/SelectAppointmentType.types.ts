import { ReactNode } from 'react';

export interface SelectAppointmentTypeProps {
  children?: ReactNode | JSX.Element;
  iconCard1: ReactNode | JSX.Element;
  iconCard2: ReactNode | JSX.Element;
  titleCard1: ReactNode | JSX.Element | string;
  titleCard2: ReactNode | JSX.Element | string;
  textCard1: ReactNode | JSX.Element | string;
  textCard2: ReactNode | JSX.Element | string;
  nextLink: string;
  isSelected: string;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
}
