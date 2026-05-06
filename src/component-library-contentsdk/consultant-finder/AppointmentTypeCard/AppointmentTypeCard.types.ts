import { ReactNode, type JSX } from 'react';

export interface AppointmentTypeCardProps {
  children?: ReactNode | JSX.Element;
  icon: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element | string;
  text: ReactNode | JSX.Element | string;
  isFollowUpAppointment: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSelected: string;
}
