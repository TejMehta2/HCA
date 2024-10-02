import { ReactNode } from 'react';

export interface LocationCardProps {
  children?: ReactNode | JSX.Element;
  icon: ReactNode | JSX.Element;
  iconFilteredTime: ReactNode | JSX.Element;
  title: ReactNode | JSX.Element | string;
  text: ReactNode | JSX.Element | string;
  time: string;
  filteredTime: string;
  facilityCRMID: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
