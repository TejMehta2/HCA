import React, {
  MutableRefObject,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';
import { YextCustomMapProps, Location } from './YextCustomMap.types';
import GoogleMapsEmbed from '../../core-components/GoogleMapsEmbed/GoogleMapsEmbed';
import mapStyles from '../../components/LocationMap/googleMapsStyles';
import { MarkerMap } from '../YextResultSectionLocations/YextResultSectionLocations.types';

const YextCustomMap = (
  props: YextCustomMapProps,
  markerRef: MutableRefObject<MarkerMap>
): JSX.Element => {
  const { center, locations, apiKey } = props;

  const generateMarkers = useCallback(
    (map: google.maps.Map) => {
      const setMarker = (location: Location) => {
        const { callback, center, id } = location;
        // Encoded from assets at './pin-numeric' and './pin-checked'
        const inactive = new window.google.maps.Marker({
          position: center,
          map,
          icon: `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 28.3.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg width='37' height='44' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 37 44' style='enable-background:new 0 0 37 44;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill-rule:evenodd;clip-rule:evenodd;fill:%230C2141;%7D .st1%7Bfill:%23FFFFFF;%7D .st2%7Bfont-family:Mark, arial, helvetica, sans-serif;%7D .st3%7Bfont-size:18px;%7D .st4%7Bfont-weight: 700;%7D%0A%3C/style%3E%3Cpath class='st0' d='M18.5,44c0,0,18.5-12.3,18.5-26.4c0-4.7-2.6-9.1-6-12.4C27.7,1.9,23.2,0,18.5,0S9.3,1.9,6,5.2 c-3.3,3.3-6,7.8-6,12.4C0,30.2,18.5,44,18.5,44z'/%3E%3Ctext transform='matrix(1 0 0 1 13.562 24.9067)' class='st1 st2 st3 st4'%3E${id}%3C/text%3E%3C/svg%3E%0A`,
        });
        const active = new window.google.maps.Marker({
          visible: false,
          position: center,
          map,
          icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='44' viewBox='0 0 37 44' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.4956 44C18.4956 44 36.9911 31.7345 36.9911 17.6C36.9911 12.9322 34.3458 8.45556 31.0233 5.15492C27.7007 1.85428 23.1944 0 18.4956 0C13.7968 0 9.29044 1.85428 5.9679 5.15492C2.64535 8.45556 0 12.9322 0 17.6C0 30.177 18.4956 44 18.4956 44ZM25.7071 13.7071C26.0976 13.3166 26.0976 12.6834 25.7071 12.2929C25.3166 11.9024 24.6834 11.9024 24.2929 12.2929L15 21.5858L11.7071 18.2929C11.3166 17.9024 10.6834 17.9024 10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L14.2929 23.7071C14.6834 24.0976 15.3166 24.0976 15.7071 23.7071L25.7071 13.7071Z' fill='%230C2141'/%3E%3C/svg%3E`,
        });
        inactive.addListener('click', () => {
          callback?.();
        });
        markerRef?.current.set(id, {
          active,
          inactive,
        });

        return center;
      };
      const markerPositions = locations.map(setMarker);
      const bounds = new google.maps.LatLngBounds();
      markerPositions.forEach(
        (markerPosition) => bounds?.extend(markerPosition)
      );
      map.fitBounds(bounds);
    },
    [locations, markerRef]
  );

  // Memoize Embed to avoid re-render on state change
  const mapMemo = useMemo(
    () => (
      <GoogleMapsEmbed
        fullscreenControl={false}
        mapTypeControl={false}
        apiKey={apiKey}
        center={center}
        callback={generateMarkers}
        zoom={10}
        styles={mapStyles}
      />
    ),
    [apiKey, generateMarkers, center]
  );

  return mapMemo;
};

export default forwardRef(YextCustomMap);
