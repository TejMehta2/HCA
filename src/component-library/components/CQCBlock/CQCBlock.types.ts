import { ReactNode } from 'react';

export interface CQCBlockProps {
  children?: ReactNode | JSX.Element;
  rating?: 'Outstanding' | 'Good' | 'Requires improvement' | 'Inadequate';
}
