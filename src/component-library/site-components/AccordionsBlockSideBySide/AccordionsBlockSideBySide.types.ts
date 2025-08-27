import { ReactNode } from 'react';
import { Accordions } from '../../components/Accordions/Accordions.types';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface AccordionsBlockSideBySideProps {
  theme: Theme;
  subtitle?: ReactNode | JSX.Element;
  header: ReactNode | JSX.Element;
  body?: ReactNode | JSX.Element;
  accordions: Accordions;
  ctas?: ReactNode | JSX.Element;
  id?: string;
  tableOfContentTitle?: string;
}
