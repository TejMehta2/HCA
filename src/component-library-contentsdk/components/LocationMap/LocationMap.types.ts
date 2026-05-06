import { type JSX } from 'react';
export type LatLngLiteral = google.maps.LatLngLiteral;

export interface Location {
  center: LatLngLiteral;
  card: (onClose: () => void) => JSX.Element;
}

export interface LocationMapProps {
  center?: LatLngLiteral;
  locations: Location[];
  apiKey: string;
}
