import { ReactNode } from 'react';

export interface CarouselImagesProps {
  images: ReactNode[] | JSX.Element[];
  contentVariation?: 'equalSize';
  id?: string;
  tableOfContentTitle?: string | null;
}
