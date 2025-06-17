import React, { MutableRefObject, forwardRef, useMemo } from 'react';
import { YextCustomMapProps } from './YextCustomMap.types';
import GoogleMapsEmbed from '../../core-components/GoogleMapsEmbed/GoogleMapsEmbed';
import mapStyles from '../../components/LocationMap/googleMapsStyles';

const YextCustomMap = (
  props: YextCustomMapProps,
  mapRef: MutableRefObject<google.maps.Map>
): JSX.Element => {
  const { center, apiKey, callback } = props;

  // Memoize Embed to avoid re-render on state change
  const mapMemo = useMemo(
    () => (
      <GoogleMapsEmbed
        ref={mapRef}
        fullscreenControl={false}
        mapTypeControl={false}
        apiKey={apiKey}
        callback={callback}
        zoom={10}
        styles={mapStyles}
        center={center}
      />
    ),
    [apiKey, callback, center, mapRef]
  );

  return mapMemo;
};

export default forwardRef(YextCustomMap);
