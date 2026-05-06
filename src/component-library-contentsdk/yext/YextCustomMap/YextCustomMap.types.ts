export interface YextCustomMapProps {
  center: google.maps.LatLngLiteral;
  apiKey: string;
  callback: ((map: google.maps.Map) => void) | undefined;
}
