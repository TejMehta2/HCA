import { ReactNode, type JSX } from 'react';

export interface LocationCardProps {
  name?: ReactNode | JSX.Element;
  description?: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
  selected?: boolean;
  contentVariation?: 'appointmentType';
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
