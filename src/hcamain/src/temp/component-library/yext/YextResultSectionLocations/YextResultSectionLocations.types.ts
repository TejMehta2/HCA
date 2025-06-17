export interface Location {
  id: string;
  center: google.maps.LatLngLiteral;
  card: JSX.Element; // YextResultCardLocations
}

export interface YextResultSectionLocationsProps {
  title?: string;
  center: google.maps.LatLngLiteral;
  locations?: Location[];
  apiKey: string;
  variation: 'side-by-side' | 'stacked';
}

export interface MarkerSet {
  marker: google.maps.Marker;
  center: google.maps.LatLngLiteral;
}
