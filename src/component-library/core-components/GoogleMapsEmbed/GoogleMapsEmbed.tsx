import React, { useEffect, useRef } from 'react';
import { GoogleMapsEmbedProps } from './GoogleMapsEmbed.types';
import styles from './GoogleMapsEmbed.module.scss';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapElement = (props: GoogleMapsEmbedProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const map = new window.google.maps.Map(ref?.current, {
      ...props,
    });
    props.callback?.(map);
  }, [props]);
  return <div ref={ref} className={styles.map} />;
};

const GoogleMapsEmbed = (props: GoogleMapsEmbedProps): JSX.Element => {
  return (
    <Wrapper apiKey={props.apiKey}>
      <MapElement {...props} />
    </Wrapper>
  );
};

export default GoogleMapsEmbed;
