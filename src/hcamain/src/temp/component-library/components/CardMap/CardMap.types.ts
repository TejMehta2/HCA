import { ReactNode } from 'react';

export interface CardMapProps {
  image?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  distance?: ReactNode | JSX.Element;
  address?: ReactNode | JSX.Element;
  ctas?: {
    button1?: ReactNode | JSX.Element;
    button2?: ReactNode | JSX.Element;
    close?: ReactNode | JSX.Element;
  };
}
