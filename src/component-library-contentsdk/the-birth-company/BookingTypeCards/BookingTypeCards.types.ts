import { ReactNode, type JSX } from 'react';

export interface BookingTypeCardProps {
  title?: ReactNode | JSX.Element;
  copy?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
}

export interface BookingTypeCardsProps {
  cards?: BookingTypeCardProps[];
}
