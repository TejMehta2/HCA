import { ReactNode } from 'react';

export interface ConsultantListHeaderProps {
  children?: ReactNode | JSX.Element;
  hasRegion?: boolean;
  title?: ReactNode | JSX.Element;
  locationSearch?: ReactNode | JSX.Element;
}
