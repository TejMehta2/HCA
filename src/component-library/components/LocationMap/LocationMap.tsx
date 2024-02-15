import React, { useCallback, useMemo, useState } from 'react';
import { LocationMapProps, LatLngLiteral } from './LocationMap.types';
import styles from './LocationMap.module.scss';
import GoogleMapsEmbed from '../../core-components/GoogleMapsEmbed/GoogleMapsEmbed';
import mapStyles from '../../components/LocationMap/googleMapsStyles';

const LocationMap = (props: LocationMapProps): JSX.Element => {
  const { center, locations, apiKey } = props;
  const [currentCard, setCurrentCard] = useState<number>();

  const generateMarkers = useCallback(
    (map: google.maps.Map) => {
      const setMarker = (latLng: LatLngLiteral, index: number) => {
        const marker = new window.google.maps.Marker({
          position: latLng,
          map,
          icon: '/map-pin.svg',
        });
        marker.addListener('click', () => {
          setCurrentCard(index);
        });

        return latLng;
      };
      const markerPositions = locations.map((location, index) =>
        setMarker(location.center, index)
      );
      const bounds = new google.maps.LatLngBounds();
      markerPositions.forEach(
        (markerPosition) => bounds?.extend(markerPosition)
      );
      map.fitBounds(bounds);
    },
    [locations]
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

  const hideCard = () => {
    setCurrentCard(undefined);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {mapMemo}
        <div className={styles.children}>
          {locations.map((location, index) => (
            <div key={index}>
              {index === currentCard && location.card(hideCard)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
