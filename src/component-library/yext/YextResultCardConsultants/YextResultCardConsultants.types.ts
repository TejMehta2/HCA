import { ReactNode } from 'react';

interface IconText {
  icon: JSX.Element;
  text: JSX.Element;
}

export interface YextResultCardConsultantsProps {
  image?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  doctify?: JSX.Element;
  phone?: JSX.Element;
  specialties?: IconText;
  copy?: ReactNode | JSX.Element;
  cta?: ReactNode | JSX.Element;
}
