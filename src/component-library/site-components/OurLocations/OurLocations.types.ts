import { CardMapProps } from '../../components/CardMap/CardMap.types';

interface transformStyles {
  translateY?: string;
  translateX?: string;
  scale?: string;
}

export interface location {
  id: number;
  theme: CardMapProps['theme'];
  name: string;
  amount: string;
  area: { mobile: string; desktop?: string };
  mapStyles: transformStyles;
  cardStyles: transformStyles;
}

export interface OurLocationsProps {
  subtitle: JSX.Element;
  title: JSX.Element;
  body: JSX.Element;
  cta: JSX.Element;
  locations: location[];
}
