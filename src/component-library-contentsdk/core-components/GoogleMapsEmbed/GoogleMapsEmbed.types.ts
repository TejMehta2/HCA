export interface GoogleMapsEmbedProps extends google.maps.MapOptions {
  callback?: (map: google.maps.Map) => void;
  apiKey: string;
}
