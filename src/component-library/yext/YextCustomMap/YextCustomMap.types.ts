export interface Location {
  id: string;
  center: google.maps.LatLngLiteral;
  callback: () => void;
  selected?: boolean;
}

export interface YextCustomMapProps {
  center: google.maps.LatLngLiteral;
  locations: Location[];
  apiKey: string;
  selectedId?: string;
}
