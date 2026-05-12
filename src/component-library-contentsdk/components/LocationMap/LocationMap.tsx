'use client';

import React, { useCallback, useMemo, useState, type JSX } from 'react';
import { LocationMapProps, LatLngLiteral } from './LocationMap.types';
import styles from './LocationMap.module.scss';
import GoogleMapsEmbed from '../../core-components/GoogleMapsEmbed/GoogleMapsEmbed';
import mapStyles from '../../components/LocationMap/googleMapsStyles';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import Themes from '../../foundation/Themes/Themes';

const LocationMap = (props: LocationMapProps): JSX.Element => {
  const { center, locations, apiKey } = props;
  const [currentCard, setCurrentCard] = useState<number>();

  const generateMarkers = useCallback(
    (map: google.maps.Map) => {
      const bounds = new google.maps.LatLngBounds();

      const getMarker = (latLng: LatLngLiteral, index: number) => {
        const marker = new window.google.maps.Marker({
          position: latLng,
          map,
          icon: '/map-pin.svg',
        });
        marker.addListener('click', () => {
          setCurrentCard(index);
        });
        bounds?.extend(marker.getPosition() as google.maps.LatLng);
        return marker;
      };

      const markers = locations.map((location, index) =>
        getMarker(location.center, index)
      );

      new MarkerClusterer({ map, markers });
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
            <Themes theme={'J-HCA-Tangerine-20'} key={index}>
              {index === currentCard && location.card(hideCard)}
            </Themes>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
