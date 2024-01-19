import { CardMapProps } from '../../components/CardMap/CardMap.types';

export interface location {
  id: number;
  theme: CardMapProps['theme'];
  name: string;
  amount: string;
  area?: string;
  mapStyles: { translateY: string; translateX?: string; scale?: string };
  cardStyles: { translateY: string; translateX?: string };
}

export interface OurLocationsProps {
  subtitle: JSX.Element;
  title: JSX.Element;
  body: JSX.Element;
  cta: JSX.Element;
  locations: location[];
}
